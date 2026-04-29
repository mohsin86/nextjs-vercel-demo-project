export const revalidate = 60;

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
}

export default async function ISRPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Incremental Static Regeneration (ISR)</h1>
      <p>Revalidates every 60 seconds</p>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}