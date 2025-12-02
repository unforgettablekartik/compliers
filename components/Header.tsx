import React from 'react'
import Link from 'next/link'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="site-header" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
      <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center' }}>
        <Logo size="medium" />
      </Link>

      <nav style={{ display: 'flex', gap: 12, marginLeft: 8 }}>
        <Link href="/docs">Docs</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  )
}
