'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Navigation from '@/components/navigationAdmin';
import Link from 'next/link';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import './usersManagement.css';

type User = {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  jobType: string;
  role: string;
};

export default function UserPage() {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // fetchUsers call inside useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/backend/users');

        if (res.ok) {
          const usersData = await res.json();
          setAllUsers(usersData);
        }
      } catch (err) {
        console.error('Fetch users error:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  const header = (
    <div className="flex justify-between items-center">
      {/* <span className="text-xl font-bold">Users List</span> */}
      
    </div>
  );

  const footer = `In total there are ${allUsers.length} users.`;

  //  row-based function
  const fullName = (row: User) => {
    return `${row.firstName} ${row.middleName ? row.middleName + ' ' : ''}${row.lastName}`;
  };

  const actionsTemplate = (row: User) => {
  return (
    row.role !== 'admin' && (
      <Link
        href={`/backend/users/${row.id}`}
        className="text-blue-600 hover:underline"
      >
        Edit
      </Link>
    )
  );
};

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <Navigation />

      {/* MAIN */}
      <div className="flex-1">

        {/* TOP NAV */}
        <div className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Management</h1>

          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>

        {/* CONTENT */}
        <main className="p-6">
          <h2 className="text-xl font-semibold mb-4">User List</h2>

          <div className="bg-white shadow rounded p-4 card">
            <DataTable className="table-zebra"
              value={allUsers}
              header={header}
              footer={footer}
              tableStyle={{ minWidth: '60rem' }}
            >
              {/* ✅ FIXED: use body instead of children */}
              <Column header="Name" body={fullName} />
              <Column field="email" header="Email" />
              <Column field="username" header="Username" />
              <Column field="phone" header="Phone" />
              <Column field="jobType" header="Job Type" />
              <Column field="role" header="Role" />

              <Column header="Actions" body={actionsTemplate} />
            </DataTable>
          </div>
        </main>
      </div>
    </div>
  );
}