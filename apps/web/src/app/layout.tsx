import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import { Providers } from './_components/providers';

export const metadata = {
  title: 'ZOUARI-RS',
  description: 'ZOUARI Entreprise Stack',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        {/* Wrap the children in our new Providers component */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
