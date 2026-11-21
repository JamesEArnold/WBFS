'use client';

import { Button, useAuth, useDocumentInfo } from '@payloadcms/ui';
import { useState } from 'react';
import { CopyableLink } from './CopyableLink';

/** Sidebar button on a user: issue a fresh setup / password-reset link (admins only). */
export const SetupLinkButton = () => {
  const { user } = useAuth<{ role?: string }>();
  const { id } = useDocumentInfo();
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (user?.role !== 'admin' || !id) return null;

  return (
    <div data-testid="setup-link-panel" style={{ marginBottom: 24 }}>
      <Button
        buttonStyle="secondary"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError(null);
          try {
            const res = await fetch(`/api/users/${id}/setup-link`, { method: 'POST', credentials: 'include' });
            const body = await res.json();
            if (!res.ok) throw new Error(body?.errors?.[0]?.message ?? 'Could not create a link.');
            setLink(body.link);
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy ? 'Creating…' : 'Copy setup / reset link'}
      </Button>
      <p style={{ fontSize: 12 }}>Creates a new link and cancels any earlier one.</p>
      {error && <p style={{ color: 'var(--theme-error-500)' }}>{error}</p>}
      {link && <CopyableLink link={link} />}
    </div>
  );
};
