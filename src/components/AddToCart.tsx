import { Plus, ShoppingBag } from 'lucide-react';
import { announce, isPurchasable, useCart, type CatalogItem } from '@/core';
import { useI18n } from '@/i18n';

export const BASKET_EVENT = 'tsuru:basket-added';

/**
 * Adds the dish and tells the header to hop the bag; sold-out dishes cannot be
 * added. `plus` is the menu board's round button: its name still names the dish.
 */
export function AddToCart({
  item,
  quantity = 1,
  variant = 'full',
  className = '',
}: {
  item: CatalogItem;
  quantity?: number;
  variant?: 'full' | 'compact' | 'plus';
  className?: string;
}) {
  const { t, langOf } = useI18n();
  const add = useCart((s) => s.add);
  const available = isPurchasable(item);

  const onAdd = () => {
    const added = add(item, quantity);
    if (added <= 0) {
      announce(t('product.limit'));
      return;
    }
    const message = t('product.added', { name: item.name });
    announce(added < quantity ? `${message}. ${t('product.limit')}` : message);
    window.dispatchEvent(new CustomEvent(BASKET_EVENT));
  };

  if (!available) {
    return variant === 'plus' ? (
      <span className="shrink-0 text-sm font-semibold text-[color:var(--ink-on-deep-soft)]">{t('product.soldOut')}</span>
    ) : (
      <button type="button" disabled className={`btn btn-quiet ${className}`}>
        {t('product.soldOut')}
      </button>
    );
  }

  if (variant === 'plus') {
    return (
      <button
        type="button"
        onClick={onAdd}
        aria-label={t('product.addNamed', { name: item.name })}
        title={t('product.addNamed', { name: item.name })}
        className={`icon-btn btn-yellow shrink-0 ${className}`}
      >
        <Plus aria-hidden="true" className="h-5 w-5" strokeWidth={2.75} />
      </button>
    );
  }

  const compact = variant === 'compact';
  return (
    <button
      type="button"
      onClick={onAdd}
      aria-label={compact ? t('product.addNamed', { name: item.name }) : undefined}
      className={`btn btn-accent ${compact ? 'px-4 text-sm' : ''} ${className}`}
    >
      <ShoppingBag aria-hidden="true" className="h-4 w-4" />
      <span lang={langOf('product.add')}>{compact ? t('product.add.short') : t('product.add')}</span>
    </button>
  );
}
