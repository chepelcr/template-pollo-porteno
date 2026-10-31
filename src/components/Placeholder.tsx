import { ProductFallbackIcon } from './CmsIcon';

/** Identity placeholder: a cream plate with the store's fallback icon. */
export function Placeholder({ label, tone = 'light' }: { label?: string; tone?: 'light' | 'deep' }) {
  const deep = tone === 'deep';
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${deep ? 'bg-surface-deep-raised text-ink-on-deep-soft' : 'bg-surface-quiet text-ink-soft'}`}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <ProductFallbackIcon className="h-10 w-10" strokeWidth={1.5} />
    </div>
  );
}
