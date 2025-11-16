import type { Metadata } from 'next';
import React from 'react';
import '../styles/globals.css';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import CompliersBot from '@/components/CompliersBot';

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H5KRRLXQGL"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H5KRRLXQGL');
            `,
          }}
        />
      </head>
      <body>
        <SiteHeader />
        <main className="site-content">{children}</main>
        <SiteFooter />
        <CompliersBot />
      </body>
    </html>
  );
}
