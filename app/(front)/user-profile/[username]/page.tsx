// File: app/[front]/user-profile/[username]/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import Navigation from '@/components/navigationFrontEnd';
import TodoItem from '../components/TodoItem';
import AddTodoForm from '../components/AddTodoForm';

import { useUserByUsername } from '@/lib/hooks/front/useUserByUsername';

type Todo = {
  id: string;
  title: string;
  priority: string;
  completed?: boolean;
};

type User = {
  username: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  gender?: string;
  jobType?: string;
  profileImage?: string;
  todos?: Todo[] | null;
  hobbies?: string[] | null;
};

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default function UserProfilePage({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);
  const username = resolvedParams.username;

  //const [user, setUser] = useState<User | null>(null);
  const { data, isLoading, error } = useUserByUsername(username);
  const userData = data?.user;



  /*
    const [err, setErr] = useState<string | null>(null);
    useEffect(() => {
       // if (!username) return;
        fetchUserData();
  }, [username]);

   const fetchUserData = async () => {
      const res = await fetch(`/api/front/users/${username}`);
      if (!res.ok) {
        console.error('API error');
        setErr('Failed to fetch user data');
        //return;
      }
      const data = await res.json();
      setUser(data.user);
    };
*/
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  const fullName = `${userData?.firstName || ''} ${userData?.middleName || ''} ${userData?.lastName || ''}`.trim();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAV */}
      <div className="bg-white border-b p-4 shadow-sm">
        <Navigation />
      </div>

      {/* PROFILE */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border p-6">

          {/* HEADER */}
          <div className="flex flex-col items-center relative">
            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="absolute top-0 right-2 w-20 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>

            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {userData?.firstName?.charAt(0) || 'U'}
            </div>

            <h1 className="text-xl font-bold mt-4">
              {fullName || 'No Name'}
            </h1>

            <p className="text-gray-500 text-sm">
              {userData?.email || 'No Email'}
            </p>

            {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
            {isLoading && <p className="text-gray-500 text-sm mt-2">Data Retriving...</p>}

          </div>

          {/* BASIC INFO */}
          <div className="mt-6 space-y-3 text-sm">

            <Info label="Username" value={userData?.username} />
            <Info label="Email" value={userData?.email} />
            <Info label="Phone" value={userData?.phone} />
            <Info label="Address" value={userData?.address} />
            <Info label="Gender" value={userData?.gender} />
            <Info label="Job Type" value={userData?.jobType} />

          </div>

          {/* HOBBIES */}
          <div className="mt-6">
            <h2 className="font-semibold text-gray-700">Hobbies</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {userData?.hobbies?.length ? (
                userData.hobbies.map((hobby: string, i: number) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-3 py-1 rounded-full text-xs"
                  >
                    {hobby}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No hobbies</p>
              )}
            </div>
          </div>

          {/* TODOS */}
          <div className="mt-6">
                <h2 className="font-semibold text-gray-700">Todos</h2>

                <div className="mt-2 space-y-2">
                  {userData?.todos?.length ? (
                    userData.todos.map((todo: Todo) => (
                      <TodoItem
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onUpdate={() => {}}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No todos</p>
                  )}
                </div>
              </div>

          {/* ACTIONS */}
          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
              Edit Profile
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

/* Helper Component */
function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value || '-'}</span>
    </div>
  );
}