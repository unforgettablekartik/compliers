'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { handleHashNavigation } from '@/lib/navigation';
import Logo from './Logo';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    handleHashNavigation(href, pathname || '/', router, e);
    setMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav id="navbar" className="site-header">
      <div className="container">
        <div className="logo">
          <Link href="/" className="logo-link" style={{ display: 'flex', alignItems: 'center' }}>
            <Logo size="small" />
          </Link>
        </div>
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
          <span className={menuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
          <span className={menuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
        </button>
        <ul className={menuOpen ? 'nav-links mobile-open' : 'nav-links'}>
          <li>
            <Link href="/" onClick={handleLinkClick('/')}>Home</Link>
          </li>
          <li>
            <Link href="/about" onClick={handleLinkClick('/about')}>About Us</Link>
          </li>
          <li>
            <Link href="/blog" onClick={handleLinkClick('/blog')}>Blogs</Link>
          </li>
          <li>
            <Link href="/book-a-call" onClick={handleLinkClick('/book-a-call')}>Appointment</Link>
          </li>
          <li>
            <Link href="/#contact" onClick={handleLinkClick('/#contact')}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
