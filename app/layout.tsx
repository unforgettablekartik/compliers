import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'The Compliers Blog',
  description: 'Insights on law and technology.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
