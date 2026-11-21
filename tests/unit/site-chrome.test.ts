import { describe, expect, it } from 'vitest';
import { footerProps, headerProps } from '@/components/site-chrome';

describe('site chrome', () => {
  it('falls back to the original header/footer if Site Settings is unavailable', () => {
    expect(headerProps(null).nav.map((n) => n.label)).toEqual(['Home', 'About', 'In Office', 'Events', 'Contribute']);
    expect(footerProps(null).disclaimer).toBe('Paid for by Weisburn for Sheriff');
  });
});
