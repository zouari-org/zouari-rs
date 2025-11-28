import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './global.css';
import type React from 'react';
import { Providers } from './_components/providers';

export const metadata = {
  title: 'ZOUARI – Keep It Simple and Secure',
  description: 'ZOUARI helps teams build reliable, secure, and maintainable digital systems. From infrastructure to applications, we focus on clarity, stability, and long-term value.',
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
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=optional"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
