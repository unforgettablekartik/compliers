import Link from 'next/link';
import React from 'react';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="main-footer">
        <div className="container footer-grid">
          <div className="footer-section">
            <h3 className="footer-heading">Our Expertise</h3>
            <ul className="footer-links">
              <li><Link href="/#services">Contracts & Agreements</Link></li>
              <li><Link href="/#services">Trademarks & IP</Link></li>
              <li><Link href="/#services">Corporate Laws</Link></li>
              <li><Link href="/#services">Data Privacy, AI & IT</Link></li>
              <li><Link href="/#services">General Legal Support</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <li><Link href="/blog">Articles & Blogs</Link></li>
              <li><Link href="/#resources">Toolkits & Checklists</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-links">
              <li><Link href="/#contact">Book a Call</Link></li>
              <li><Link href="/#contact">Write to us</Link></li>
              <li><Link href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">WhatsApp</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Terms & Policies</h3>
            <ul className="footer-links">
              <li><Link href="/terms">Terms of Use</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
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
