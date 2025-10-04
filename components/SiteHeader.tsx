import Link from 'next/link';
import React from 'react';

export default function SiteHeader() {
  return (
    <nav id="navbar">
      <div className="container">
        <div className="logo">
          <Link href="/" className="logo-link">
            The Compliers
          </Link>
        </div>
        <ul className="nav-links">
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
