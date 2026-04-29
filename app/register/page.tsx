'use client';

import Navigation from '@/components/Navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegisterSchema } from '@/lib/userRegisterSchema';
import { z } from 'zod';
import { useState } from 'react';

type FormData = z.infer<typeof userRegisterSchema>;

export default function RegisterPage() {
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      jobType: '',
      hobbies: [],
    },
  });

  const onSubmit = async (data: FormData) => {
  try {
    // 1️⃣ get short-lived JWT
    const tokenRes = await fetch('/api/auth/token');
    const { token } = await tokenRes.json();

    // 2️⃣ submit form with JWT in header
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // 🔐 JWT in header
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      reset();
      setSuccess(result.message);
    } else {
      setSuccess('');
      console.error(result.message);
    }
  } catch (error) {
    console.error('Submit error:', error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVIGATION (FULL WIDTH TOP) */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto p-4">
          <Navigation />
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="flex justify-center py-10 px-4">

        <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border p-8">

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-center mb-6">
            Contact Form (React Hook Form + Zod)
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* First Name */}
            <input
              {...register('firstName')}
              placeholder="First Name"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.firstName?.message}</p>

            {/* Middle Name */}
            <input
              {...register('middleName')}
              placeholder="Middle Name (optional)"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
            />

            {/* Last Name */}
            <input
              {...register('lastName')}
              placeholder="Last Name"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.lastName?.message}</p>

            {/* Email */}
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>

            {/* Phone */}
            <input
              {...register('phone')}
              placeholder="Phone"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>

            {/* Address */}
            <textarea
              {...register('address')}
              placeholder="Address"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.address?.message}</p>

            {/* Gender */}
            <div className="space-y-1">
              <p className="font-medium">Gender</p>

              <div className="flex gap-4 text-sm">
                <label>
                  <input type="radio" value="Male" {...register('gender')} /> Male
                </label>

                <label>
                  <input type="radio" value="Female" {...register('gender')} /> Female
                </label>
              </div>

              <p className="text-red-500 text-sm">{errors.gender?.message}</p>
            </div>

            {/* Hobbies */}
            <div className="space-y-1">
              <p className="font-medium">Hobbies</p>

              <div className="flex flex-col gap-1 text-sm">
                <label>
                  <input type="checkbox" value="Reading" {...register('hobbies')} /> Reading
                </label>

                <label>
                  <input type="checkbox" value="Gaming" {...register('hobbies')} /> Gaming
                </label>

                <label>
                  <input type="checkbox" value="Traveling" {...register('hobbies')} /> Traveling
                </label>
              </div>

              <p className="text-red-500 text-sm">{errors.hobbies?.message}</p>
            </div>

            {/* Job Type */}
            <select
              {...register('jobType')}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Job</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
            </select>

            <p className="text-red-500 text-sm">{errors.jobType?.message}</p>

            {/* BUTTON */}
            <button
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            {/* SUCCESS */}
            {success && (
              <p className="text-green-600 text-center font-medium">
                {success}
              </p>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}