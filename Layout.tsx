import React from 'react';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        {/* Add your site navigation or logo here */}
        <h1>Compilers Next.js App</h1>
      </header>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
