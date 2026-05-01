// FILE: app/%28admin%29/backend/todo/page.tsx

'use client';

import Navigation from '@/components/navigationAdmin';
import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';

export default function TodoPage() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [editTask, setEditTask] = useState<any>(null);

  const [showForm, setShowForm] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = await fetch('/api/backend/users?type=dropdown');
        const userData = await userRes.json();
        console.log(' USERS:', userData);
        setUsers(userData);

        const todoRes = await fetch('/api/backend/todo');
        const todoData = await todoRes.json();
        console.log('TODOS:', todoData);
        setTodos(todoData);

      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    loadData();
  }, []);

  // ADD
  const addTodo = async (data: any) => {
    await fetch('/api/backend/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    setShowForm('add');
    await refreshTodos();
  };

  // UPDATE
  const updateTodo = async (data: any) => {
    await fetch(`/api/backend/todo/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    setEditTask(null);
    setShowForm('add');
    await refreshTodos();
  };

  const refreshTodos = async () => {
      const res = await fetch('/api/backend/todo');
      const data = await res.json();
      setTodos(data);
    };

  const handleEdit = (todo: any) => {
    setEditTask(todo);
    setShowForm('edit');
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/backend/todo/${id}`, {
      method: 'DELETE',
    });
    await refreshTodos();
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
        
      {/* SIDEBAR */}
      <Navigation />

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOP NAV */}
        <div className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Todo Management</h1>
        </div>

        {/* CONTENT */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold">
            Todo List
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
  
          {/* FORM */}
          <div>
            {showForm === 'add' && (
              <TaskForm mode="add" users={users} onSubmit={addTodo} />
            )}

            {showForm === 'edit' && editTask && (
              <TaskForm
                mode="edit"
                users={users}
                initialData={editTask}
                onSubmit={updateTodo}
                onCancel={() => {
                  setEditTask(null);
                  setShowForm('add');
                }}
              />
            )}
          </div>

          {/* LIST */}
          <div className="space-y-3">
            {todos.map((task: any) => (
              <div key={task.id} className="bg-white p-4 rounded shadow flex justify-between">
                
                <div>
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm break-words whitespace-pre-line">
                    {task.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Priority: {task.priority}
                  </p>
                  <p className={`text-xs ${task.completed ? 'text-green-500' : 'text-yellow-500'}`}>
                    Status: {task.completed ? 'Completed' : 'Pending'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <p className="text-xs text-gray-500">
                    Assign To: {task.user?.firstName} {task.user?.lastName || 'Unassigned'}
                  </p>
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
        </main>
      </div>
    </div>
  );
}