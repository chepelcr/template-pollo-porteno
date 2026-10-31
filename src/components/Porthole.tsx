import type { ReactNode } from 'react';

const RIVETS = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);

/** A ship's porthole around a photo: navy ring with brass rivets, yellow edge. */
export function Porthole({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <div className="porthole h-full w-full bg-surface-quiet">{children}</div>
      <svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        {RIVETS.map((a) => (
          <circle key={a} cx={50 + Math.cos(a) * 51.4} cy={50 + Math.sin(a) * 51.4} r="1.05" style={{ fill: 'var(--pp-yellow)' }} />
        ))}
      </svg>
    </div>
  );
}
