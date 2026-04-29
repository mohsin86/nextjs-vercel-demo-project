'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-1'
      : 'text-gray-700 hover:text-blue-500';

  return (
    <nav className="border-b border-gray-300 mb-6">
      <ul className="flex gap-6 p-4">
        
        <li>
          <Link href="/" className={linkClass('/')}>
            Home
          </Link>
        </li>

        <li>
          <Link href="/about" className={linkClass('/about')}>
            About
          </Link>
        </li>

        <li>
          <Link href="/contacts" className={linkClass('/contacts')}>
            Contacts
          </Link>
        </li>

      </ul>
    </nav>
  );
}