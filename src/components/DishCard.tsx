import { Link } from 'wouter';
import { isPurchasable, type CatalogCategory, type CatalogItem } from '@/core';
import { AddToCart } from './AddToCart';
import { Placeholder } from './Placeholder';
import { Price } from './Price';
import { StoreImage } from './StoreImage';

/** A favourite from the grill: its photo, name and price, ready to add. */
export function DishCard({ item, category }: { item: CatalogItem; category?: CatalogCategory }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-frame)] bg-surface-raised shadow-soft ring-2 ring-[color:var(--rule)] has-[a:focus-visible]:outline has-[a:focus-visible]:outline-[3px] has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-[color:var(--focus)]">
      <div className={`relative aspect-[4/3] overflow-hidden bg-surface-quiet ${isPurchasable(item) ? '' : 'grayscale'}`}>
        <StoreImage src={item.imageUrl} alt="" sizes="(min-width: 1024px) 17rem, (min-width: 640px) 45vw, 90vw" maxWidth={720} fallback={<Placeholder />} />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-[color:var(--pp-yellow)] px-3 py-1 text-sm font-bold text-[color:var(--pp-navy)]">{category.name}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-text text-lg font-bold leading-snug text-heading">
          <Link href={`/products/${item.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:underline">
            {item.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-center justify-between gap-3 [&_.price-tag]:text-2xl">
          <Price item={item} />
          <div className="relative z-10">
            <AddToCart item={item} variant="compact" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function DishCardSkeleton() {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-[var(--radius-frame)] bg-surface-raised ring-2 ring-[color:var(--rule)]">
      <div className="skeleton aspect-[4/3] rounded-none" />
      <div className="p-4">
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton mt-4 h-9 w-full" />
      </div>
    </div>
  );
}
