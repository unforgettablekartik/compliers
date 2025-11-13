import Link from 'next/link';
import React from 'react';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="main-footer">
        <div className="container footer-content">
          <div className="footer-copy">The Compliers © 2025 | All Rights Reserved</div>
          <ul className="footer-nav">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#services">Our Expertise</Link>
            </li>
            <li>
              <Link href="/#contact">Contact</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Use</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
