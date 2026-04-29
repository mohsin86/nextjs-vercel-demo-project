'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false); // 🔥 NEW
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          remember, // 🔥 send to backend
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

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
      setLoading(false);
    }
  };

  // 🔥 forgot password handler (email redirect or API later)
  const handleForgotPassword = () => {
    const email = prompt('Enter your email for password reset:');

    if (email) {
      fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      alert('Reset link sent to email (if exists)');
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

        {/* USERNAME */}
        <input
          className="w-full border p-2 rounded"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔥 REMEMBER ME */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>

        {/* 🔥 FORGOT PASSWORD */}
        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-blue-600 text-sm text-center">
            Checking credentials...
          </p>
        )}

        {/* LOGIN BUTTON */}
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