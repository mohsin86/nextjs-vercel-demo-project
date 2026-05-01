// File: app/dashboard/page.tsx
// This is the main dashboard page component for the Next.js application. It includes a sidebar for navigation and a main content area that displays an overview of the dashboard. The page also includes a logout button that allows users to log out of their account.

'use client';

import { useRouter } from 'next/navigation';
import NavigationAdmin from '@/components/navigationAdmin'; // 

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
      <NavigationAdmin />

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOP NAV */}
        <div className="bg-white border-b p-4 flex justify-between items-center">
          <span className="font-semibold">My Dashboard</span>

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