import crypto from 'node:crypto';
import type { CollectionBeforeOperationHook, CollectionConfig, Endpoint, PayloadRequest } from 'payload';
import { addDataAndFileToRequest, APIError, Forbidden } from 'payload';
import { isAdmin, isAdminField, isAdminOrSelf, isAdminReq, isStaffReq } from '../access/roles';

const SETUP_LINK_HOURS = 72;

function serverUrl(req: PayloadRequest): string {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    req.headers.get('origin') ||
    `https://${req.headers.get('host') ?? 'localhost:3000'}`
  ).replace(/\/$/, '');
}

/** Issue a fresh single-use setup/reset link (replaces any previous one). */
async function issueSetupLink(req: PayloadRequest, email: string): Promise<string> {
  req.context.allowSetupLink = true;
  try {
    const token = await req.payload.forgotPassword({
      collection: 'users',
      data: { email },
      disableEmail: true,
      req,
    });
    if (!token) throw new APIError('Could not create a setup link for that user.', 500);
    return `${serverUrl(req)}/admin/reset/${token}`;
  } finally {
    req.context.allowSetupLink = false;
  }
}

function requireAdmin(req: PayloadRequest): void {
  if (!isAdminReq(req)) throw new Forbidden(req.t);
}

const inviteEndpoint: Endpoint = {
  path: '/invite',
  method: 'post',
  handler: async (req) => {
    requireAdmin(req);
    await addDataAndFileToRequest(req);
    const { name, email, role } = (req.data ?? {}) as { name?: string; email?: string; role?: string };
    if (!name || !email) throw new APIError('Name and email are required.', 400);

    const user = await req.payload.create({
      collection: 'users',
      data: {
        name,
        email,
        role: role === 'admin' ? 'admin' : 'editor',
        // Random password nobody sees; the user sets their own via the setup link.
        password: crypto.randomBytes(32).toString('base64url'),
      },
      overrideAccess: false,
      req,
    });

    try {
      const link = await issueSetupLink(req, email);
      return Response.json({ id: user.id, link, expiresInHours: SETUP_LINK_HOURS });
    } catch {
      return Response.json(
        {
          id: user.id,
          link: null,
          message: 'User created, but the setup link failed. Open the user and use "Copy setup link".',
        },
        { status: 202 },
      );
    }
  },
};

const setupLinkEndpoint: Endpoint = {
  path: '/:id/setup-link',
  method: 'post',
  handler: async (req) => {
    requireAdmin(req);
    const id = req.routeParams?.id as string | undefined;
    if (!id) throw new APIError('Missing user id.', 400);
    const user = await req.payload.findByID({ collection: 'users', id, overrideAccess: false, req });
    const link = await issueSetupLink(req, user.email);
    return Response.json({ id: user.id, link, expiresInHours: SETUP_LINK_HOURS });
  },
};

/**
 * - Public first-user signup is closed outside local dev. Payload's registerFirstUser
 *   calls create with overrideAccess, so access control alone doesn't stop it.
 *   Only scripts/bootstrap-admin.ts (context.trustedBootstrap) may create without a user.
 * - The built-in forgot-password flow is closed: there is no email service, and
 *   anonymous requests must not be able to replace an outstanding setup link.
 */
const guardAccountOperations: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (operation === 'create' && !req.user) {
    const allowed = req.context?.trustedBootstrap === true || process.env.APP_ENV === 'local';
    if (!allowed) throw new Forbidden(req.t);
  }
  if (operation === 'forgotPassword' && req.context?.allowSetupLink !== true) {
    throw new Forbidden(req.t);
  }
  return args;
};

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    components: {
      beforeListTable: ['/cms/components/InviteUser#InviteUser'],
    },
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    forgotPassword: {
      expiration: SETUP_LINK_HOURS * 60 * 60 * 1000,
      // Admin-generated links only; no need to throttle.
      minRequestInterval: 0,
    },
  },
  access: {
    admin: ({ req }) => isStaffReq(req),
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
    unlock: isAdmin,
  },
  hooks: {
    beforeOperation: [guardAccountOperations],
  },
  endpoints: [inviteEndpoint, setupLinkEndpoint],
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Editor — edit and publish content', value: 'editor' },
        { label: 'Admin — also manage users', value: 'admin' },
      ],
      access: { create: isAdminField, update: isAdminField },
    },
    {
      name: 'setupLink',
      type: 'ui',
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data?.id),
        components: { Field: '/cms/components/SetupLinkButton#SetupLinkButton' },
      },
    },
  ],
};
