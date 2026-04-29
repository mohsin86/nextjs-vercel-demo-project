// 1. Hybrid Page (SSR + CSR together)

import DashboardClient from './ui/DashboardClient';

async function getStats() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store', // SSR
  });

  return res.json();
}

export default async function DashboardPage() {
  const stats = await getStats();


  return <DashboardClient initialStats={stats} />;
}