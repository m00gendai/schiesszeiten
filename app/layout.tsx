import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

import "@/globals/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
      <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
