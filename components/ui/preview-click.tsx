'use client';

import { useEffect } from 'react';
import { EDIT_FIELD_MESSAGE, type EditFieldMessage } from '@/lib/cms/previewMessages';

const MARKED = '[data-cms-field],[data-cms-tab]';

/**
 * Click-to-edit inside the admin's Live Preview: parts of the page marked with
 * lib/cms/editable.ts get a gold outline on hover, and clicking one tells the
 * admin (cms/components/PreviewJump.tsx) to open that field in the form.
 * Does nothing outside the Live Preview frame (e.g. in a "Preview" tab).
 */
export const PreviewClick = () => {
  useEffect(() => {
    if (window.parent === window) return;

    const badge = document.createElement('div');
    badge.textContent = '✎ Click to edit';
    badge.setAttribute('aria-hidden', 'true');
    Object.assign(badge.style, {
      position: 'fixed',
      zIndex: '2147483647',
      pointerEvents: 'none',
      padding: '2px 8px',
      borderRadius: '4px',
      background: '#e6c673',
      color: '#0a0a0a',
      font: '700 11px/1.6 system-ui, sans-serif',
      letterSpacing: '0.04em',
      display: 'none',
    });
    document.body.appendChild(badge);

    let hovered: HTMLElement | null = null;
    const clearHover = () => {
      hovered?.removeAttribute('data-cms-hover');
      hovered = null;
      badge.style.display = 'none';
    };

    const onOver = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest?.<HTMLElement>(MARKED) ?? null;
      if (el === hovered) return;
      clearHover();
      if (!el) return;
      hovered = el;
      el.setAttribute('data-cms-hover', '');
      const rect = el.getBoundingClientRect();
      badge.style.left = `${Math.max(4, rect.left)}px`;
      badge.style.top = `${Math.max(4, rect.top - 24)}px`;
      badge.style.display = 'block';
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const marked = target?.closest?.(MARKED);
      if (!marked) return;
      // Stay on this page: in the preview a click means "edit this", not "follow the link".
      event.preventDefault();
      event.stopPropagation();
      const message: EditFieldMessage = {
        type: EDIT_FIELD_MESSAGE,
        field: marked.closest<HTMLElement>('[data-cms-field]')?.dataset.cmsField,
        tab: marked.closest<HTMLElement>('[data-cms-tab]')?.dataset.cmsTab,
      };
      // Only names of form fields are sent; the admin checks the message came from its preview frame.
      window.parent.postMessage(message, '*');
    };

    document.documentElement.classList.add('cms-click-to-edit');
    document.addEventListener('mouseover', onOver);
    document.addEventListener('scroll', clearHover, { passive: true });
    document.addEventListener('click', onClick, true);
    return () => {
      document.documentElement.classList.remove('cms-click-to-edit');
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('scroll', clearHover);
      document.removeEventListener('click', onClick, true);
      clearHover();
      badge.remove();
    };
  }, []);
  return null;
};
