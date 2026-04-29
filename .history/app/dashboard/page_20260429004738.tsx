'use client';

import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });

    router.push('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          My Dashboard
        </h2>

        <nav className="flex flex-col gap-4 text-gray-700">
          <a href="/dashboard" className="hover:text-blue-600">
            Overview
          </a>
          <a href="/contacts" className="hover:text-blue-600">
            Contacts Form
          </a>
          <a href="/about" className="hover:text-blue-600">
            About
          </a>

          {/* 🔥 LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="mt-6 text-left text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOP NAV */}
        <div className="bg-white border-b p-4 flex justify-between">
          <Navigation />

          {/* optional top logout */}
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>

        {/* CONTENT */}
        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Dashboard Overview
          </h1>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="text-gray-500">Total Users</h3>
              <p className="text-3xl font-bold">1,240</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="text-gray-500">Form Submissions</h3>
              <p className="text-3xl font-bold">312</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="text-gray-500">Active Sessions</h3>
              <p className="text-3xl font-bold">89</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}