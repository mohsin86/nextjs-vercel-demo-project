'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // 🔥 NEW

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // 🔥 show processing

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // small delay for UX (optional)
      setTimeout(() => {
        if (data.role === 'admin') {
          router.push('/dashboard');
        } else {
          router.push('/user-profile');
        }
      }, 500);

    } catch (err) {
      alert('Something went wrong');
    } finally {
      setLoading(false); // 🔥 hide loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Login
        </h1>

        <input
          className="w-full border p-2 rounded"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔥 LOADING MESSAGE */}
        {loading && (
          <p className="text-blue-600 text-sm text-center">
            Checking credentials...
          </p>
        )}

        <button
          className={`w-full p-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600'
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Login'}
        </button>
      </form>
    </div>
  );
}