'use client';

import { useState } from 'react';

export default function DashboardClient({ initialStats }: any) {
  const [stats] = useState(initialStats);

  return (
    <div>
      <h1>Dashboard</h1>

      <pre>{JSON.stringify(stats, null, 2)}</pre>

      <button onClick={() => alert('Client interaction')}>
        Refresh UI Action
      </button>
    </div>
  );
}