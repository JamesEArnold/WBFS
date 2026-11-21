'use client';

import { Button, useAuth } from '@payloadcms/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CopyableLink } from './CopyableLink';

type Result = { link: string | null; message?: string };

/** "Invite user" form shown above the Users list (admins only). */
export const InviteUser = () => {
  const { user } = useAuth<{ role?: string }>();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'editor' | 'admin'>('editor');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (user?.role !== 'admin') return null;

  async function invite(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/users/invite', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.errors?.[0]?.message ?? body?.message ?? 'Invite failed.');
      setResult(body);
      setName('');
      setEmail('');
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div data-testid="invite-user" style={{ marginBottom: 24, padding: 16, border: '1px solid var(--theme-elevation-150)' }}>
      <h3 style={{ marginTop: 0 }}>Invite a user</h3>
      <p style={{ marginTop: 0 }}>
        Creates the account and gives you a private setup link (valid 72 hours) to send them. They choose
        their own password.
      </p>
      <form onSubmit={invite} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <label>
          Name
          <br />
          <input name="invite-name" required value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <br />
          <input name="invite-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Role
          <br />
          <select name="invite-role" value={role} onChange={(e) => setRole(e.target.value as 'editor' | 'admin')}>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <Button type="submit" disabled={busy} buttonStyle="primary" margin={false}>
          {busy ? 'Inviting…' : 'Invite user'}
        </Button>
      </form>
      {error && <p style={{ color: 'var(--theme-error-500)' }}>{error}</p>}
      {result?.link && <CopyableLink link={result.link} />}
      {result && !result.link && <p>{result.message}</p>}
    </div>
  );
};
