import type { Metadata } from 'next';
import React from 'react';
import '../styles/globals.css';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

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
      <body>
        <SiteHeader />
        <main className="site-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
