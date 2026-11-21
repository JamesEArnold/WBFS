'use client';

import { Button } from '@payloadcms/ui';
import { useState } from 'react';

export const CopyableLink = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ marginTop: 12 }}>
      <p style={{ marginBottom: 4 }}>
        Setup link (send this privately — it works once and expires in 72 hours):
      </p>
      <input data-testid="setup-link" readOnly value={link} style={{ width: '100%' }} onFocus={(e) => e.target.select()} />
      <Button
        buttonStyle="secondary"
        size="small"
        onClick={async () => {
          await navigator.clipboard?.writeText(link).catch(() => undefined);
          setCopied(true);
        }}
      >
        {copied ? 'Copied' : 'Copy link'}
      </Button>
    </div>
  );
};
