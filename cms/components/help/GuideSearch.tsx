'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Item = { slug: string; title: string; summary: string; category: string; minutes: number; adminsOnly?: boolean; text: string };

/** Type-to-filter list of every guide, grouped by category. */
export function GuideSearch({ items, categories }: { items: Item[]; categories: string[] }) {
  const [query, setQuery] = useState('');
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = useMemo(
    () => items.filter((item) => words.every((word) => item.text.includes(word))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, query],
  );

  return (
    <>
      <label className="help-search">
        <span>What do you want to do?</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="e.g. photo, event, banner, password"
          data-testid="help-search"
        />
      </label>
      {shown.length === 0 && <p className="help-empty">No guide matches “{query}”. Try a simpler word, or see “Something isn’t working”.</p>}
      {categories.map((category) => {
        const inCategory = shown.filter((item) => item.category === category);
        if (inCategory.length === 0) return null;
        return (
          <section key={category} className="help-category">
            <h2>{category}</h2>
            <div className="help-cards">
              {inCategory.map((item) => (
                <Link key={item.slug} href={`/admin/help/${item.slug}`} className="help-card" data-testid="help-card">
                  <strong>{item.title}</strong>
                  <span>{item.summary}</span>
                  <small>
                    About {item.minutes} min{item.adminsOnly ? ' · Admins only' : ''}
                  </small>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
