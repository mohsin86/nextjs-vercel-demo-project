export const revalidate = 60;

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
}

export default async function ISRPage() {
  const posts: Post[] = await getPosts();

  return (
    <div>
      <h1>Incremental Static Regeneration (ISR)</h1>
      <p>Revalidates every 60 seconds</p>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}