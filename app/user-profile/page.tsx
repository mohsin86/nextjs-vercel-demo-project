'use client';

import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function UserProfile() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });

    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP NAV */}
      <div className="bg-white border-b p-4 shadow-sm">
        <Navigation />
      </div>

      {/* PROFILE CARD */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border p-6">

          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
              U
            </div>

            <h1 className="text-xl font-bold mt-4">
              John Doe
            </h1>

            <p className="text-gray-500 text-sm">
              johndoe@example.com
            </p>
          </div>

          {/* INFO */}
          <div className="mt-6 space-y-3 text-sm">

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Role</span>
              <span className="font-medium">User</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium">+880 123456789</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex gap-3">

            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Edit Profile
            </button>

            <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
              Settings
            </button>

          </div>

          {/* 🔥 LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}