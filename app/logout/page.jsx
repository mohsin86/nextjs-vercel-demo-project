'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch('/api/logout', {
          method: 'POST',
        });
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        router.push('/');
      }
    };

    logout();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Logging out...</p>
    </div>
  );
}