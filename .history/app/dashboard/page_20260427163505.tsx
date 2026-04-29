import DashboardClient from './ui/DashboardClient';

async function getStats() {
  const res = await fetch('https://api.example.com/stats', {
    cache: 'no-store', // SSR
  });

  return res.json();
}

export default async function DashboardPage() {
  const stats = await getStats();

  return <DashboardClient initialStats={stats} />;
}