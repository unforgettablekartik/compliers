'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { handleHashNavigation } from '@/lib/navigation';

export default function SiteFooter() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    handleHashNavigation(href, pathname || '/', router, e);
  };

  return (
    <footer className="site-footer">
      <div className="main-footer">
        <div className="container footer-grid">
          <div className="footer-section">
            <h3 className="footer-heading">Our Expertise</h3>
            <ul className="footer-links">
              <li><Link href="/agreementor" onClick={handleLinkClick('/agreementor')}>Contracts & Agreements</Link></li>
              <li><Link href="/markster" onClick={handleLinkClick('/markster')}>Trademarks & IP</Link></li>
              <li><Link href="/creator-in-law" onClick={handleLinkClick('/creator-in-law')}>Creators' Legal Counsel</Link></li>
              <li><span className="footer-text-unclickable">Fractional General Counsel</span></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <li><Link href="/blog" onClick={handleLinkClick('/blog')}>Articles & Blogs</Link></li>
              <li><span className="footer-text-unclickable">Toolkits & Checklists</span></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-links">
              <li><Link href="/book-a-call" onClick={handleLinkClick('/book-a-call')}>Book a Call</Link></li>
              <li><Link href="/about#contact" onClick={handleLinkClick('/about#contact')}>Write to us</Link></li>
              <li><Link href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">WhatsApp</Link></li>
              <li><button type="button" className="footer-chat-button" onClick={() => window.dispatchEvent(new CustomEvent('openCompliersBot'))}>Let&apos;s Chat</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Terms & Policies</h3>
            <ul className="footer-links">
              <li><Link href="/terms" onClick={handleLinkClick('/terms')}>Terms of Use</Link></li>
              <li><Link href="/privacy" onClick={handleLinkClick('/privacy')}>Privacy Policy</Link></li>
              <li><Link href="/disclaimer" onClick={handleLinkClick('/disclaimer')}>Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="footer-copy">The Compliers © 2025 | All Rights Reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
