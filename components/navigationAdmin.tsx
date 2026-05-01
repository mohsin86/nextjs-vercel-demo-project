
//file: components/Navigation-admin.tsx

'use client';

import { useRouter } from 'next/navigation';

export default function NavigationBackEnd() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });

    router.push('/login');
  };

  return (
   <>

        <aside className="w-64 bg-white border-r p-6 hidden md:block">
                <h2 className="text-xl font-bold mb-6 text-gray-800">
                Demo Project
                </h2>

                <nav className="flex flex-col gap-4 text-gray-700">
                <a href="/backend/dashboard" className="hover:text-blue-600">
                    Overview
                </a>
                <a href="/backend/users" className="hover:text-blue-600">
                    Users
                </a>
                <a href="/backend/todo" className="hover:text-blue-600">
                    Todo List
                </a>

                {/* 🔥 LOGOUT BUTTON */}
                <button
                    onClick={handleLogout}
                    className="mt-6 text-left text-red-600 hover:text-red-800 "
                >
                    Logout
                </button>
                </nav>
            </aside>
    
   </>
  );
}