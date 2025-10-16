import React from 'react';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import CompliersBot from './CompliersBot';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="site-content">{children}</main>
      <SiteFooter />
      <CompliersBot />
    </>
  );
}
