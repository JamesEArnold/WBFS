import { describe, expect, it } from 'vitest';
import { checkEnv } from '@/scripts/lib/env';

const local = {
  APP_ENV: 'local',
  EXPECTED_DB_ENDPOINT: '127.0.0.1:54329',
  DATABASE_URL: 'postgres://u:p@127.0.0.1:54329/wbfs',
};

describe('env guard', () => {
  it('passes when the database matches the environment', () => {
    expect(checkEnv(local)).toMatchObject({ ok: true, appEnv: 'local', target: '127.0.0.1:54329' });
  });

  it('matches Neon endpoints by their ep- id', () => {
    const neon = {
      APP_ENV: 'production',
      EXPECTED_DB_ENDPOINT: 'ep-cool-river-123456',
      DATABASE_URL: 'postgres://u:p@ep-cool-river-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
    };
    expect(checkEnv(neon).ok).toBe(true);
  });

  it('refuses when DATABASE_URL points somewhere else', () => {
    const wrong = { ...local, DATABASE_URL: 'postgres://u:p@ep-prod-999.neon.tech/neondb' };
    const result = checkEnv(wrong);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/Refusing/);
  });

  it('refuses unknown or missing settings', () => {
    expect(checkEnv({ ...local, APP_ENV: 'staging' }).ok).toBe(false);
    expect(checkEnv({ ...local, EXPECTED_DB_ENDPOINT: '' }).ok).toBe(false);
    expect(checkEnv({ ...local, DATABASE_URL: undefined }).ok).toBe(false);
  });
});
