import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './global.css';
import { Inter } from 'next/font/google';
import type React from 'react';
import { AppLayout } from './_components/AppLayout/AppLayout';
import { Providers } from './_components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ZOUARI – Keep It Simple and Secure',
  description:
    'ZOUARI helps teams build reliable, secure, and maintainable digital systems. From infrastructure to applications, we focus on clarity, stability, and long-term value.',
  keywords: [
    'infrastructure',
    'engineering',
    'consulting',
    'web platforms',
    'application development',
    'automation',
    'system design',
    'secure systems',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
