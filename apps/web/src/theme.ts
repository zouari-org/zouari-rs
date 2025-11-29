'use client';

import { createTheme, type MantineTheme, rem } from '@mantine/core';

export const theme = createTheme({
  /**
   * Colors
   * Mantine expects an array of 10 shades for every custom color.
   * We define 'zouariPrimary' using the blue shades from your providers.tsx.
   */
  colors: {
    zouariPrimary: [
      '#e8f1fb', // 0: Lightest (hover backgrounds, subtle highlights)
      '#d1e3f7', // 1
      '#a3c7ef', // 2
      '#6696d5', // 3
      '#4a82c8', // 4
      '#3b71b8', // 5: Default Primary (Brand Color)
      '#2d5a94', // 6: Hover state for primary buttons
      '#244a7a', // 7
      '#1a3a60', // 8
      '#102a47', // 9: Darkest (text, deep backgrounds)
    ],
    // You can add a 'slate' or 'navy' palette here if you have specific grays
  },

  primaryColor: 'zouariPrimary',
  primaryShade: 5, // Key index from the array above (default is 6, but your brand matches index 5 better)

  /**
   * Typography
   * We use the system font stack as a fallback for performance.
   */
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  headings: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '700',
    // We can scale heading sizes using rem
    sizes: {
      h1: { fontSize: rem(36) },
      h2: { fontSize: rem(30) },
      h3: { fontSize: rem(24) },
      h4: { fontSize: rem(20) },
    },
  },

  /**
   * Spacing & Radius
   * Using rem() ensures these values respect the user's browser font-size settings.
   */
  defaultRadius: 'md',
  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },

  /**
   * Shadows
   * Ported from your global.css to use Mantine's shadow system.
   * Usage: <Paper shadow="md" />
   */
  shadows: {
    xs: '0 1px 2px rgba(16, 23, 38, 0.04)',
    sm: '0 1px 3px rgba(16, 23, 38, 0.06), 0 4px 12px rgba(16, 23, 38, 0.04)',
    md: '0 4px 12px rgba(16, 23, 38, 0.08)',
    lg: '0 8px 24px rgba(16, 23, 38, 0.12)',
    xl: '0 12px 32px rgba(16, 23, 38, 0.16)',
  },

  /**
   * Component Defaults
   * This "Refactor" step reduces boilerplate in your page files.
   * Every component will now feel "ZOUARI branded" by default.
   */
  components: {
    Container: {
      defaultProps: {
        size: 'lg', // Sets default max-width to 1200px (approx)
      },
    },
    Button: {
      defaultProps: {
        size: 'md',
        radius: 'md', // Matches your "solid and reliable" aesthetic
      },
      styles: {
        root: {
          fontWeight: 600, // Slightly bolder buttons are better for legibility
        },
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
      styles: (theme: MantineTheme) => ({
        input: {
          // You can access theme variables here if needed
          backgroundColor: theme.colors.gray[0],
        },
      }),
    },
    Paper: {
      defaultProps: {
        radius: 'md',
        withBorder: true, // Adds a subtle border by default for better definition
      },
    },
  },
});
