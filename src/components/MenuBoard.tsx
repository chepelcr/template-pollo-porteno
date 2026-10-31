import { Link } from 'wouter';
import type { CatalogCategory, CatalogItem } from '@/core';
import { useI18n } from '@/i18n';
import { AddToCart } from './AddToCart';
import { Price } from './Price';

export interface BoardSection {
  category: CatalogCategory | null;
  items: CatalogItem[];
  /** Dishes of this category the board left out (they are in the full menu). */
  more?: number;
}

/** One dish on the board: name, dotted leader, the price in big painted numbers, and +. */
function BoardRow({ item }: { item: CatalogItem }) {
  return (
    <li className="group relative py-3">
      <div className="flex items-end gap-2">
        <h4 className="min-w-0 font-text text-lg font-bold leading-snug">
          <Link href={`/products/${item.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:underline">
            {item.name}
          </Link>
        </h4>
        <span aria-hidden="true" className="leader hidden sm:block" />
        <div className="ml-auto shrink-0 text-right [&_.price-tag]:text-2xl">
          <Price item={item} />
        </div>
        <div className="relative z-10">
          <AddToCart item={item} variant="plus" />
        </div>
      </div>
      {item.description && <p className="mt-0.5 max-w-[48ch] text-sm text-ink-soft">{item.description}</p>}
    </li>
  );
}

/**
 * The menu board: categories as painted tabs over their dishes, two columns on
 * wide screens. Everything on it is the store's own catalog.
 */
export function MenuBoard({ sections, label }: { sections: BoardSection[]; label: string }) {
  const { t } = useI18n();
  return (
    <div className="on-deep board p-5 sm:p-8 md:p-10" role="group" aria-label={label}>
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {sections.map(({ category, items, more }) => (
          <section key={category?.id ?? 'other'} aria-labelledby={category ? `board-${category.id}` : undefined} className="break-inside-avoid">
            {category && (
              <h3 id={`board-${category.id}`} className="mb-2 inline-flex rounded-full bg-[color:var(--pp-red)] px-4 py-1.5 text-2xl text-[color:var(--pp-whitewash)]">
                {category.name}
              </h3>
            )}
            <ul className="divide-y divide-[color:var(--rule-on-deep)]">
              {items.map((item) => (
                <BoardRow key={item.id} item={item} />
              ))}
            </ul>
            {more ? (
              <Link href={`/products?category=${encodeURIComponent(category?.key ?? '')}`} className="mt-2 inline-flex min-h-tap items-center font-bold text-[color:var(--pp-yellow)] hover:underline">
                {t('menu.more', { count: more })}
              </Link>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}

export function MenuBoardSkeleton() {
  return (
    <div aria-hidden="true" className="board p-8">
      <div className="grid gap-10 md:grid-cols-2">
        {Array.from({ length: 2 }, (_, s) => (
          <div key={s} className="flex flex-col gap-4">
            <div className="skeleton-deep h-9 w-36 rounded-full" />
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="skeleton-deep h-6 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Board sections from the catalog: each category with dishes, in the store's
 * order, at most `limit` dishes each (the rest counted for "see more"), then
 * dishes without a category.
 */
export function boardSections(categories: CatalogCategory[], items: CatalogItem[], limit = Infinity): BoardSection[] {
  const sections: BoardSection[] = [];
  for (const category of categories) {
    const dishes = items.filter((i) => i.categoryId === category.id);
    if (!dishes.length) continue;
    sections.push({ category, items: dishes.slice(0, limit), more: Math.max(0, dishes.length - limit) });
  }
  const known = new Set(categories.map((c) => c.id));
  const loose = items.filter((i) => !i.categoryId || !known.has(i.categoryId));
  if (loose.length) sections.push({ category: null, items: loose.slice(0, limit), more: Math.max(0, loose.length - limit) });
  return sections;
}
