// File: pages/api/

export default function handler(req, res) {
    const { method } = req;
    
    switch (method) {
        case 'GET':
        res.status(200).json({ message: 'Fetching user data' });
        break;
        case 'POST':
        res.status(201).json({ message: 'Creating a new user' });
        break;
        case 'PUT':
        res.status(200).json({ message: 'Updating user data' });
        break;
        case 'DELETE':
        res.status(200).json({ message: 'Deleting user data' });
        break;
        default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}

//File : pages/test-api/index.tsx

import { useState } from 'react';

export default function TestAPI() {
  const [response, setResponse] = useState(null);

  const callApi = async (method) => {
    try {
      const res = await fetch('/api/user', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(method === 'POST' || method === 'PUT' ? 
        { body: JSON.stringify({ name: 'John Doe' }) } : {}),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error.message });
    }
  };

  return (
    <div>
        <h1>Test API Routes</h1>
        <div>
            <button onClick={() => callApi('GET')}>
                GET
            </button>
            <button onClick={() => callApi('POST')}>
                POST
            </button>
            <button onClick={() => callApi('PUT')}>
                PUT
            </button>
            <button onClick={() => callApi('DELETE')}>
                DELETE
            </button>
        </div>
        <div>
            <h2>Response:</h2>
            <pre>
                {response ? JSON.stringify(response, null, 2) : 
                    'No response yet'}
            </pre>
        </div>
    </div>
  );
}