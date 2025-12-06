import type { Metadata } from 'next';
import React from 'react';
import '../styles/globals.css';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import CompliersBot from '@/components/CompliersBot';

export const metadata: Metadata = {
  title: {
    default: 'The Compliers - Legal Counsel for Growing Businesses, Creators & Agencies',
    template: '%s | The Compliers',
  },
  description: 'Expert legal support for contracts, trademarks, compliance, and specialized advisory. Fixed fees, fast turnaround, transparent pricing. Your trusted legal partner.',
  keywords: 'legal counsel, contracts, trademarks, compliance, legal advisory, business law, IP protection, NDA, agreements, legal services India',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'The Compliers',
  },
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7BRF35JH6P"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7BRF35JH6P');
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
