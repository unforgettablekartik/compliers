'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav id="navbar">
      <div className="container">
        <div className="logo">
          <Link href="/" className="logo-link">
            The Compliers
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
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/#about">About Us</Link>
          </li>
          <li>
            <Link href="/#services">Our Expertise</Link>
          </li>
          <li>
            <Link href="/blog">Blogs</Link>
          </li>
          <li>
            <Link href="/#contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
