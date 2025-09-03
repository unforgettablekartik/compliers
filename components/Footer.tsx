import React from 'react';

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem 0', background: '#f1f1f1' }}>
      <p>&copy; {new Date().getFullYear()} Compilers App. All rights reserved.</p>
    </footer>
  );
}
