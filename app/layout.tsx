import type { ReactNode } from 'react';
import '../styles/globals.css';
import Layout from '../components/Layout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
