import { describe, expect, it } from 'vitest';
import { limitFileSize, MAX_UPLOAD_MB } from '@/cms/collections/Media';

const MB = 1024 * 1024;
const save = (filesize: number) =>
  // Only `data` matters to this hook.
  (limitFileSize as (args: { data: Record<string, unknown> }) => unknown)({ data: { alt: 'x', filesize } });

describe('upload size limit (browser uploads go straight to Blob, so it is checked on save)', () => {
  it('accepts a typical phone photo', () => {
    expect(() => save(12 * MB)).not.toThrow();
  });

  it('accepts a file exactly at the limit', () => {
    expect(() => save(MAX_UPLOAD_MB * MB)).not.toThrow();
  });

  it('rejects a larger file with a message that says what to do', () => {
    expect(() => save(MAX_UPLOAD_MB * MB + 1)).toThrow();
    try {
      save(40 * MB);
    } catch (error) {
      expect(JSON.stringify((error as { data?: unknown }).data ?? (error as Error).message)).toMatch(/40\.0 MB.*limit is 25 MB/);
    }
  });
});
