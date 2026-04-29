// 2. Server-Side Rendering (SSR)

export const dynamic = 'force-dynamic';

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/', {
    cache: 'no-store',
  });

  return res.json();
}

export default async function SSRPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Server-Side Rendering (SSR)</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}