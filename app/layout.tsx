import '../styles/globals.css';

export const metadata = {
  title: 'The Compliers',
  description: 'Blog powered by Notion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
