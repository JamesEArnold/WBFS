/**
 * Runs Postgres 17 client tools (pg_dump / pg_restore) via Docker, so no local
 * Postgres install is needed. Requires Docker Desktop to be running.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const IMAGE = 'postgres:17-alpine';

/** Inside a container, the host's localhost is host.docker.internal. */
export function dockerReachableUri(databaseUri: string): string {
  const url = new URL(databaseUri);
  if (['127.0.0.1', 'localhost'].includes(url.hostname)) url.hostname = 'host.docker.internal';
  return url.toString();
}

function run(args: string[], io: { stdinFile?: string; stdoutFile?: string }): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn('docker', args, { stdio: ['pipe', io.stdoutFile ? 'pipe' : 'inherit', 'inherit'] });
    if (io.stdoutFile) child.stdout!.pipe(fs.createWriteStream(io.stdoutFile));
    if (io.stdinFile) fs.createReadStream(io.stdinFile).pipe(child.stdin!);
    else child.stdin!.end();
    child.on('error', reject);
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`docker ${args[3] ?? ''} exited with ${code}`))));
  });
}

export function pgDump(databaseUri: string, outFile: string): Promise<void> {
  return run(['run', '--rm', IMAGE, 'pg_dump', '--format=custom', '--no-owner', '--no-privileges', dockerReachableUri(databaseUri)], {
    stdoutFile: outFile,
  });
}

export function pgRestore(databaseUri: string, dumpFile: string): Promise<void> {
  return run(
    ['run', '--rm', '-i', IMAGE, 'pg_restore', '--no-owner', '--no-privileges', '--exit-on-error', '--dbname', dockerReachableUri(databaseUri)],
    { stdinFile: dumpFile },
  );
}
