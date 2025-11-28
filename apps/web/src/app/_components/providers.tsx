'use client';

import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Config for a "solid and reliable" stack
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Mantine v7 theme customization
const theme = createTheme({
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
  primaryColor: 'blue',
  colors: {
    // Custom blue matching ZOUARI brand
    blue: [
      '#e8f1fb',
      '#d1e3f7',
      '#a3c7ef',
      '#6696d5',
      '#4a82c8',
      '#3b71b8',
      '#2d5a94',
      '#244a7a',
      '#1a3a60',
      '#102a47',
    ],
  },
  radius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  defaultRadius: 'md',
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Notifications />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
}
