// STATIC (cached at build time)

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts (Static Cached)</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}