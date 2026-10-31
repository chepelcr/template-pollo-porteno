/** A painted flame; `flicker` animates it a few times (hero only, CSS, reduced motion stops it). */
export function Flame({ className = '', flicker = false }: { className?: string; flicker?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 40" className={className}>
      <g className={flicker ? 'flame' : undefined}>
        <path d="M16 2c5.6 5.7 9.9 11.5 9.9 17.8a9.9 9.9 0 0 1-19.8 0c0-3.5 1.5-6.4 3.9-9 .1 2.9 1.5 4.8 3.5 5.8-.4-5.5.7-9.9 2.5-14.6Z" style={{ fill: 'var(--pp-red)' }} />
        <path d="M16 21c2.3 2.3 3.8 4.4 3.8 6.7a3.8 3.8 0 0 1-7.6 0c0-2.3 1.5-4.4 3.8-6.7Z" style={{ fill: 'var(--pp-yellow)' }} />
      </g>
    </svg>
  );
}
