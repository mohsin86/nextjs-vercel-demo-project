'use client';

import { useRouter, useParams } from 'next/navigation';
import Navigation from '@/components/navigationAdmin';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: {  errors,  isSubmitting },
  } = useForm();

  // ✅ FETCH USER DATA
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/backend/users/${userId}`);

        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await res.json();

        console.log('USER DATA:', data); // 🔥 DEBUG

        //  prefill form here
        reset({
          username: data.username,
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          gender: data.gender,
          jobType: data.jobType,
          hobbies: data.hobbies || [],
        });

      } catch (err) {
        console.error(err);
        setServerError('Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, reset]);

  const onSubmit = async (data: any) => {
    const res = await fetch(`/api/backend/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      setServerError(result.message);
    } else {
      //router.push('/backend/users');
      setSuccess('User updated successfully');
    }
  };

  if (loading) {
    return <p className="p-6">Loading user...</p>;
  }

  return (
      <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <Navigation />

      {/* MAIN */}
      <div className="flex-1">

        {/* TOP NAV */}
        <div className="bg-white border-b p-4 flex justify-between">
          <h1 className="text-xl font-semibold">Edit User</h1>

         
        </div>

        {/* FORM */}
        <main className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-5xl bg-white p-6 rounded shadow space-y-6"
          >

  {/* GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* First Name */}
    <div>
      <label className="label">First Name</label>
      <input {...register('firstName')} className="input" />
      <p className="text-red-500 text-sm">{errors.firstName?.message as string}</p>
    </div>

    {/* Middle Name */}
    <div>
      <label className="label">Middle Name</label>
      <input {...register('middleName')} className="input" />
    </div>

    {/* Last Name */}
    <div>
      <label className="label">Last Name</label>
      <input {...register('lastName')} className="input" />
      <p className="text-red-500 text-sm">{errors.lastName?.message as string}</p>
    </div>

    {/* Username */}
    <div>
      <label className="label">Username</label>
      <input {...register('username')} className="input" />
      <p className="text-red-500 text-sm">{errors.username?.message as string}</p>
    </div>

    {/* Email */}
    <div>
      <label className="label">Email</label>
      <input {...register('email')} className="input" />
      <p className="text-red-500 text-sm">{errors.email?.message as string}</p>
    </div>

    {/* Phone */}
    <div>
      <label className="label">Phone</label>
      <input {...register('phone')} className="input" />
      <p className="text-red-500 text-sm">{errors.phone?.message as string}</p>
    </div>

    {/* Job Type */}
    <div>
      <label className="label">Job Type</label>
      <select {...register('jobType')} className="input">
        <option value="">Select Job</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
      </select>
    </div>

    {/* Address (full width row) */}
    <div className="md:col-span-2">
      <label className="label">Address</label>
      <textarea {...register('address')} className="input" />
    </div>

  </div>

  {/* BUTTON */}
  <div className="pt-4">
    <button
      disabled={isSubmitting}
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >
      {isSubmitting ? 'Updating...' : 'Update User'}
    </button>
  </div>
  
   {/* SUCCESS */}
            {success && (
              <p className="text-green-600 text-center font-medium">
                {success}
              </p>
            )}

            {serverError && (
              <p className="text-red-600 text-center font-medium">
                {serverError}
              </p>
            )}


</form>
        </main>
      </div>
    </div>
  );
}