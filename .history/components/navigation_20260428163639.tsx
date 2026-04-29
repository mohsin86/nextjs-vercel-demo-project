// components/Navigation.tsx

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '20px' }}>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contacts">Contacts</Link>
        </li>
      </ul>
    </nav>
  );
}