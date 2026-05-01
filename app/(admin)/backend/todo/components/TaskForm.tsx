'use client';

import { useEffect, useState } from 'react';

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

type Task = {
  id?: string;
  title: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  userId: string;
  completed?: boolean;
};

const escapeHtml = (text: string) => {
  return text
    ?.replace(/&/g, '&amp;')
    ?.replace(/</g, '&lt;')
    ?.replace(/>/g, '&gt;')
    ?.replace(/"/g, '&quot;')
    ?.replace(/'/g, '&#039;');
};

type Props = {
  mode: 'add' | 'edit';
  users: User[];
  initialData?: Task;
  onSubmit: (data: Task) => void;
  onCancel?: () => void;
};

export default function TaskForm({
  mode,
  users,
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [userId, setUserId] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPriority(initialData.priority || 'MEDIUM');
      setUserId(initialData.userId || '');
      setCompleted(initialData.completed || false);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({
      id: initialData?.id,
      title,
      description,
      priority,
      userId,
      completed,
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">

      {/* TITLE */}
      <input
        className="border p-2 w-full rounded"
        placeholder="Todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* DESCRIPTION */}

      <textarea
        className="border p-2 w-full rounded min-h-[100px] resize-y"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* PRIORITY */}
      <select
        className="border p-2 w-full rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
      >
        <option value="LOW">Low Priority</option>
        <option value="MEDIUM">Medium Priority</option>
        <option value="HIGH">High Priority</option>
      </select>

      {/* USER */}
      <select
        className="border p-2 w-full rounded"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">Assign User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.firstName} {u.lastName}
          </option>
        ))}
      </select>

      {/* COMPLETED (only edit mode) */}
      {mode === 'edit' && (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Mark as Completed
        </label>
      )}

      {/* BUTTONS */}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {mode === 'add' ? 'Add Todo' : 'Update Todo'}
        </button>

        {mode === 'edit' && onCancel && (
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}