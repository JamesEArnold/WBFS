'use client';

import { type ReactNode, useEffect } from 'react';
import { fieldElementIds } from '@/lib/cms/editable';
import { isEditFieldMessage } from '@/lib/cms/previewMessages';

/**
 * Admin side of click-to-edit: when an editor clicks part of the page in the
 * Live Preview (components/ui/preview-click.tsx), open that form tab, unfold
 * the field if it's folded away, scroll to it, focus it and flash it gold.
 * Mounted once for the whole admin (payload.config.ts → admin.components.providers).
 */

const WAIT_MS = 4000;
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

function openTab(label: string): boolean {
  const button = Array.from(document.querySelectorAll<HTMLButtonElement>('.tabs-field__tab-button')).find(
    (b) => b.textContent?.trim() === label,
  );
  if (!button) return false;
  if (!button.classList.contains('tabs-field__tab-button--active')) button.click();
  return true;
}

const toggleOf = (collapsible: Element) =>
  collapsible.querySelector<HTMLButtonElement>(':scope > .collapsible__toggle-wrap .collapsible__toggle');

/** Unfold "More options" and list rows that hide the element (and the row itself, if it is one). */
function unfold(el: HTMLElement) {
  const folded: Element[] = [];
  for (let node: HTMLElement | null = el; node; node = node.parentElement) {
    if (node.classList.contains('collapsible--collapsed')) folded.push(node);
  }
  const own = el.querySelector(':scope > .collapsible--collapsed, :scope > * > .collapsible--collapsed');
  if (own) folded.push(own);
  for (const collapsible of folded) toggleOf(collapsible)?.click();
}

/**
 * Open the folded "More options" on the current tab. Each is clicked once (a
 * second click would fold it again). Returns the ones just opened.
 */
function openMoreOptions(clicked: WeakSet<Element>): Element[] {
  const opened: Element[] = [];
  document.querySelectorAll('.tabs-field__content-wrap .collapsible-field__collapsible.collapsible--collapsed').forEach((collapsible) => {
    if (clicked.has(collapsible)) return;
    clicked.add(collapsible);
    toggleOf(collapsible)?.click();
    opened.push(collapsible);
  });
  return opened;
}

/** The form's scrolling box (the whole page, or the form pane beside the Live Preview). */
function formScroller(): Element {
  for (let node = document.querySelector('.tabs-field__content-wrap')?.parentElement; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node);
    if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) return node;
  }
  return document.scrollingElement ?? document.documentElement;
}

/**
 * Find the field, revealing what hides it. Payload builds a field only once
 * it is near the screen, and only once a folded "More options" or list row is
 * opened, so: switch tab (done by the caller), unfold the row or open "More
 * options" and scroll to it, and otherwise scroll down the form step by step.
 * Falls back to the nearest row or list if the exact field never appears.
 */
async function findField(path: string): Promise<HTMLElement | null> {
  const ids = fieldElementIds(path);
  const start = performance.now();
  const unfolded = new Set<string>();
  const opened = new WeakSet<Element>();
  let lastScroll = 0;
  while (performance.now() - start < WAIT_MS) {
    const exact = document.getElementById(ids[0]);
    if (exact) return exact;
    const now = performance.now();
    const ancestorId = ids.slice(1).find((id) => document.getElementById(id));
    if (ancestorId && !unfolded.has(ancestorId)) {
      unfolded.add(ancestorId);
      const ancestor = document.getElementById(ancestorId)!;
      unfold(ancestor);
      ancestor.scrollIntoView({ block: 'center' });
      lastScroll = now;
    } else if (now - start > 250 && now - lastScroll > 150) {
      const justOpened = openMoreOptions(opened);
      if (justOpened.length) justOpened[0].scrollIntoView({ block: 'center' });
      else formScroller().scrollBy(0, Math.round(window.innerHeight * 0.8));
      lastScroll = now;
    }
    await nextFrame();
  }
  for (const id of ids.slice(1)) {
    const el = document.getElementById(id);
    if (el) return el;
  }
  return null;
}

function focusAndFlash(el: HTMLElement) {
  // A list row or section: highlight that row; a field: its whole box (label, input, help text).
  const isRow = /-row-\d+$/.test(el.id);
  const wrapper = (isRow ? el.closest<HTMLElement>('.collapsible') : el.closest<HTMLElement>('.field-type')) ?? el;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  wrapper.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  const input = el.matches('input, textarea, [contenteditable="true"]')
    ? el
    : el.querySelector<HTMLElement>('input:not([type="hidden"]), textarea, [contenteditable="true"]');
  input?.focus({ preventScroll: true });
  wrapper.classList.remove('preview-jump-flash');
  void wrapper.offsetWidth; // restart the animation
  wrapper.classList.add('preview-jump-flash');
  window.setTimeout(() => wrapper.classList.remove('preview-jump-flash'), 2000);
}

export async function jumpToField(field?: string, tab?: string): Promise<boolean> {
  if (tab) openTab(tab);
  if (!field) return Boolean(tab);
  const el = await findField(field);
  if (!el) return false;
  unfold(el);
  await nextFrame();
  focusAndFlash(el);
  return true;
}

export function PreviewJump({ children }: { children?: ReactNode }) {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!isEditFieldMessage(event.data)) return;
      // Only listen to the Live Preview frame on this screen.
      const fromPreview = Array.from(document.querySelectorAll('iframe')).some((frame) => frame.contentWindow === event.source);
      if (!fromPreview) return;
      void jumpToField(event.data.field, event.data.tab);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);
  return <>{children}</>;
}
