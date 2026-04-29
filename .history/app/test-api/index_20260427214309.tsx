// File: pages/test-api/index.tsx

import { useState } from 'react';

type ApiResponse = {
  message?: string;
  error?: string;
  [key: string]: any;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default function TestAPI() {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const callApi = async (method: HttpMethod) => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/users', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          method === 'POST' || method === 'PUT'
            ? JSON.stringify({ name: 'John Doe' })
            : undefined,
      });

      // 🔥 Handle non-200 responses properly
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || `HTTP error! Status: ${res.status}`);
      }

      setResponse(data);
    } catch (error: any) {
      setResponse({ error: error.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Test API Routes</h1>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button onClick={() => callApi('GET')}>GET</button>
        <button onClick={() => callApi('POST')}>POST</button>
        <button onClick={() => callApi('PUT')}>PUT</button>
        <button onClick={() => callApi('DELETE')}>DELETE</button>
      </div>

      <div>
        <h2>Response:</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <pre>
            {response
              ? JSON.stringify(response, null, 2)
              : 'No response yet'}
          </pre>
        )}
      </div>
    </div>
  );
}