'use client';

import { useEffect, useState } from 'react';

export default function DisplayData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the API route
    const fetchData = async () => {
      const response = await fetch('/api/proxy'); 
      const result = await response.json();
      setData(result); // Update state with fetched data
    };

    fetchData();
  }, []); // Run only once on component mount

  return (
    <div>
      <h1>Proxy API Data</h1>
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}