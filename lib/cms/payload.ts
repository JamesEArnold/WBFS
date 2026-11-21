import 'server-only';
import config from '@payload-config';
import { getPayload } from 'payload';

/**
 * The only place the app obtains a Payload instance (enforced by ESLint
 * no-restricted-imports). Elsewhere, Local API calls pass
 * `overrideAccess: false` and the request/user — except lib/cms/public.ts,
 * which reads published content only.
 */
export const getPayloadClient = () => getPayload({ config });
