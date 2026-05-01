'use client';

import { useState } from 'react';

type Props = {
  id: string;
  title: string;
  completed?: boolean;
  onUpdate: () => void; // refresh parent
};

export default function TodoItem({ id, title, completed, onUpdate }: Props) {
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    setLoading(true);

    await fetch(`/api/front/todo/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });

    setLoading(false);
    onUpdate(); // 🔥 refresh list
  };

  return (
    <div className="flex justify-between items-center border p-2 rounded">
      <span className={completed ? 'line-through text-gray-400' : ''}>
        {title}
      </span>

      <button
        onClick={toggleStatus}
        disabled={loading}
        className={`text-xs px-2 py-1 rounded ${
          completed ? 'bg-green-500 text-white' : 'bg-yellow-400'
        }`}
      >
        {completed ? 'Done' : 'Pending'}
      </button>
    </div>
  );
}