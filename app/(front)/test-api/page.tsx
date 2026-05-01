'use client';

import { useState } from 'react';

type ApiResponse = {
  message?: string;
  error?: string;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default function TestAPIPage() {
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const callApi = async (method: HttpMethod) => {
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

      const data = await res.json();
      setResponse(data);
    } catch (error: unknown) {
      setResponse({
        error: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  };

  return (
    <div>
      <h1>Test API</h1>

      <button onClick={() => callApi('GET')}>GET</button>
      <button onClick={() => callApi('POST')}>POST</button>
      <button onClick={() => callApi('PUT')}>PUT</button>
      <button onClick={() => callApi('DELETE')}>DELETE</button>

      <pre>
        {response
          ? JSON.stringify(response, null, 2)
          : 'No response yet'}
      </pre>
    </div>
  );
}