import React from 'react';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import CompliersBot from './CompliersBot';
import DisclosureBanner from './DisclosureBanner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DisclosureBanner />
      <SiteHeader />
      <main className="site-content">{children}</main>
      <SiteFooter />
      <CompliersBot />
    </>
  );
}
