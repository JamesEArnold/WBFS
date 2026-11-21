import crypto from 'node:crypto';
import path from 'node:path';
import type { Media } from '@/payload-types';

/** Root of locally stored uploads (Payload's default staticDir for `media`). */
export const LOCAL_MEDIA_DIR = path.resolve(process.cwd(), 'media');

export type ManifestFile = {
  mediaId: number;
  variant: string; // "original" or an image size name
  pathname: string; // storage path (Blob pathname or file name under ./media)
  mimeType: string | null;
  bytes: number;
  sha256: string;
};

export type Manifest = {
  createdAt: string;
  appEnv: string;
  database: string;
  storage: 'blob' | 'local';
  files: ManifestFile[];
};

export const sha256 = (data: Buffer) => crypto.createHash('sha256').update(data).digest('hex');

/** Every stored file of a Media document: the original plus generated sizes. */
export function mediaFiles(doc: Media): { variant: string; filename: string; url: string | null; mimeType: string | null }[] {
  const files = [];
  if (doc.filename) files.push({ variant: 'original', filename: doc.filename, url: doc.url ?? null, mimeType: doc.mimeType ?? null });
  for (const [name, size] of Object.entries(doc.sizes ?? {})) {
    if (size?.filename) files.push({ variant: name, filename: size.filename, url: size.url ?? null, mimeType: size.mimeType ?? null });
  }
  return files;
}

/** Blob pathname from a public Blob URL (e.g. https://x.public.blob.vercel-storage.com/a%20b.jpg → "a b.jpg"). */
export function blobPathname(url: string): string {
  return decodeURIComponent(new URL(url).pathname.replace(/^\/+/, ''));
}
