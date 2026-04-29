import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between">

      {/* LEFT - LINKS */}
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li>
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
        </li>
        <li>
          <Link href="/contacts" className="hover:text-blue-600">
            Contacts
          </Link>
        </li>
      </ul>

      {/* RIGHT - AUTH BUTTONS */}
      <div className="flex gap-3">

        <Link
          href="/login"
          className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Register
        </Link>

      </div>
    </nav>
  );
}