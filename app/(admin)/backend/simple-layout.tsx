
'use client';

import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigationAdmin';


export default function SimpleLayout() {
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
          <Navigation />
    
          {/* MAIN CONTENT */}
          <div className="flex-1">
    
            {/* TOP NAV */}
            <div className="bg-white border-b p-4 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">User Management</h1>
    
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
    
            {/* CONTENT */}
              <main className="p-6">
          <h2 className="text-2xl font-semibold">
            User List
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="text-gray-500">Total Users</h3>
              <p className="text-3xl font-bold">1,240</p>
            </div>

            
          </div>
        </main>
          </div>
        </div>
  );
}