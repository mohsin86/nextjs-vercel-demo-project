'use client';

import { useEffect, useState } from 'react';

export default function CSRPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await res.json();

      setPosts(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Client-Side Rendering (CSR)</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}