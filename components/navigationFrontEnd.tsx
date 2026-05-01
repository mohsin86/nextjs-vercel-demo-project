import Link from 'next/link';

export default function NavigationFronEnd() {
  return (
    <nav className="flex items-center justify-between">

      {/* LEFT LINKS (unchanged) */}
      <ul className="flex gap-6 text-gray-700">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contacts">Contacts</Link>
        </li>
      </ul>

      {/* RIGHT AUTH BUTTONS (NEW ONLY) */}
      <div className="flex gap-3">

        <Link
          href="/login"
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register
        </Link>

      </div>

    </nav>
  );
}