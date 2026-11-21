/**
 * The Vercel Blob read-write token for this environment.
 * Preview's store is connected with the default prefix (BLOB_READ_WRITE_TOKEN);
 * Production's store uses the PROD_BLOB prefix because Vercel won't reuse a
 * prefix across stores in one project. Locally neither is set (uploads go to ./media).
 */
export const blobToken = (): string | undefined =>
  process.env.BLOB_READ_WRITE_TOKEN || process.env.PROD_BLOB_READ_WRITE_TOKEN || undefined;
