'use client';

import { useState } from 'react';

export default function AddTodoForm({ username, onAdd }: any) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title.trim()) return;

    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, username }),
    });

    setTitle('');
    onAdd(); // 🔥 refresh
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo..."
        className="flex-1 border p-2 rounded"
      />

      <button className="bg-blue-600 text-white px-3 rounded">
        Add
      </button>
    </form>
  );
}