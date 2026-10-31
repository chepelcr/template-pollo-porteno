import type { ThemeDefaults } from '@/core';

/** The template's own accent and surfaces; the store's branding overrides the accent. */
export const themeDefaults: ThemeDefaults = {
  brand: '#12385A',
  brand2: '#F6C21C',
  surface: '#FFFDF7',
  // Raised cards are the least favorable reading surface in dark mode.
  darkSurface: '#16293D',
  displayFont: '"Lilita One", "Rubik", system-ui, sans-serif',
  bundledFonts: ['Lilita One', 'Rubik'],
  displayFallback: 'system-ui, sans-serif',
};
