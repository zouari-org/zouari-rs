'use client';

import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  /**
   * ZOUARI "Grand Prix" Theme
   * 1. Primary: Power Red (Action)
   * 2. Secondary: Midnight Navy (Structure)
   * 3. Canvas: Warm Paper (Humanity)
   * 4. Material: Titanium (The Bridge) -> NEW!
   */
  colors: {
    // 1. POWER RED
    zouariPrimary: [
      '#fff0f2',
      '#ffdee2',
      '#ffc2c9',
      '#ff9ba6',
      '#ff697a',

      '#f93a52',
      '#D90429',
      '#b90322',
      '#98061d',
      '#7f081b',
    ],
    // 2. MIDNIGHT NAVY
    zouariNavy: [
      '#f8fafc',
      '#f1f5f9',
      '#e2e8f0',
      '#cbd5e1',
      '#94a3b8',
      '#64748b',
      '#475569',
      '#334155',
      '#1e293b',
      '#0f172a',
    ],
    // 3. (Canvas is handled via global.css variables)

    // 4. TITANIUM (The 4th Color)
    // A cool, metallic scale to bridge Navy and Dark backgrounds
    zouariTitanium: [
      '#ffffff',
      '#f8fafc',
      '#f1f5f9', // 2: The "Badge" Color (Platinum)
      '#e2e8f0', // 3: Borders
      '#cbd5e1',
      '#94a3b8',
      '#64748b',
      '#475569',
      '#334155',
      '#1e293b',
    ],
  },

  primaryColor: 'zouariPrimary',
  primaryShade: 6,

  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',

  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '800',
    sizes: {
      h1: { fontSize: rem(44), lineHeight: '1.1' },
      h2: { fontSize: rem(36), lineHeight: '1.2' },
      h3: { fontSize: rem(28), lineHeight: '1.3' },
    },
  },

  defaultRadius: 'xs',

  components: {
    Button: {
      defaultProps: { size: 'md', radius: 'xs' },
      styles: {
        root: { fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' },
      },
    },
    Paper: { defaultProps: { radius: 'xs', withBorder: true } },
    Card: { defaultProps: { radius: 'xs', withBorder: true } },
  },
});
