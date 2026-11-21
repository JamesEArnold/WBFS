/**
 * Refuses to run data scripts (migrate, seed, bootstrap, backup) against the
 * wrong database. Each environment declares APP_ENV plus EXPECTED_DB_ENDPOINT
 * (local: "127.0.0.1:54329"; Neon: the "ep-…" endpoint id), and DATABASE_URI
 * must point at that endpoint.
 *
 * Used by scripts/env-guard.ts and every data script.
 */

export type AppEnv = 'local' | 'preview' | 'production';

const APP_ENVS: AppEnv[] = ['local', 'preview', 'production'];

export function describeDbTarget(databaseUri: string): string {
  try {
    const url = new URL(databaseUri);
    return url.port ? `${url.hostname}:${url.port}` : url.hostname;
  } catch {
    return '<unparseable DATABASE_URI>';
  }
}

export function checkEnv(env: Record<string, string | undefined>): { ok: true; appEnv: AppEnv; target: string } | { ok: false; error: string } {
  const appEnv = env.APP_ENV as AppEnv | undefined;
  if (!appEnv || !APP_ENVS.includes(appEnv)) {
    return { ok: false, error: `APP_ENV must be one of ${APP_ENVS.join(', ')} (got "${env.APP_ENV ?? ''}").` };
  }
  const expected = env.EXPECTED_DB_ENDPOINT?.trim();
  if (!expected) return { ok: false, error: 'EXPECTED_DB_ENDPOINT is not set.' };
  const uri = env.DATABASE_URI;
  if (!uri) return { ok: false, error: 'DATABASE_URI is not set.' };
  const target = describeDbTarget(uri);
  if (!target.includes(expected)) {
    return {
      ok: false,
      error: `DATABASE_URI points at "${target}", but APP_ENV=${appEnv} expects "${expected}". Refusing to continue.`,
    };
  }
  return { ok: true, appEnv, target };
}

export function assertEnv(options: { refuseProduction?: boolean } = {}): AppEnv {
  const result = checkEnv(process.env);
  if (!result.ok) throw new Error(`[env-guard] ${result.error}`);
  if (options.refuseProduction && result.appEnv === 'production') {
    throw new Error('[env-guard] This script is not allowed to run against production.');
  }
  console.log(`[env-guard] OK — APP_ENV=${result.appEnv}, database ${result.target}`);
  return result.appEnv;
}
