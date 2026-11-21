import type { Access, FieldAccess, PayloadRequest } from 'payload';

export type Role = 'admin' | 'editor';

type MaybeUser = { id: number | string; role?: Role | null } | null | undefined;

export const roleOf = (req: PayloadRequest): Role | undefined =>
  (req.user as MaybeUser)?.role ?? undefined;

export const isAdminReq = (req: PayloadRequest): boolean => roleOf(req) === 'admin';

/** Admins and editors — anyone who can work in the CMS. */
export const isStaffReq = (req: PayloadRequest): boolean => {
  const role = roleOf(req);
  return role === 'admin' || role === 'editor';
};

export const isAdmin: Access = ({ req }) => isAdminReq(req);
export const isStaff: Access = ({ req }) => isStaffReq(req);
export const anyone: Access = () => true;

/** Admins see everyone; other logged-in users only themselves. */
export const isAdminOrSelf: Access = ({ req }) => {
  const user = req.user as MaybeUser;
  if (!user) return false;
  if (user.role === 'admin') return true;
  return { id: { equals: user.id } };
};

export const isAdminField: FieldAccess = ({ req }) => isAdminReq(req);
