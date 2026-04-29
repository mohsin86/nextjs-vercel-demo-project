'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/schema';
import { z } from 'zod';

type FormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
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
    //console.log('Client validated data:', data);

    // optional: send to server action
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Contact Form (React Hook Form + Zod)___
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* First Name */}
          <input
            {...register('firstName')}
            placeholder="First Name"
            className="border p-2 w-full"
          />
          <p className="text-red-500">{errors.firstName?.message}</p>

          {/* Middle Name */}
          <input
            {...register('middleName')}
            placeholder="Middle Name"
            className="border p-2 w-full"
          />

          {/* Last Name */}
          <input
            {...register('lastName')}
            placeholder="Last Name"
            className="border p-2 w-full"
          />
          <p className="text-red-500">{errors.lastName?.message}</p>

          {/* Email */}
          <input
            {...register('email')}
            placeholder="Email"
            className="border p-2 w-full"
          />
          <p className="text-red-500">{errors.email?.message}</p>

          {/* Phone */}
          <input
            {...register('phone')}
            placeholder="Phone"
            className="border p-2 w-full"
          />
          <p className="text-red-500">{errors.phone?.message}</p>

          {/* Address */}
          <textarea
            {...register('address')}
            placeholder="Address"
            className="border p-2 w-full"
          />
          <p className="text-red-500">{errors.address?.message}</p>

          {/* Gender */}
          <div>
            <label>
              <input type="radio" value="Male" {...register('gender')} /> Male
            </label>

            <label className="ml-4">
              <input type="radio" value="Female" {...register('gender')} /> Female
            </label>

            <p className="text-red-500">{errors.gender?.message}</p>
          </div>

          {/* Hobbies */}
          <div>
            <label>
              <input type="checkbox" value="Reading" {...register('hobbies')} /> Reading
            </label>

            <label className="ml-4">
              <input type="checkbox" value="Gaming" {...register('hobbies')} /> Gaming
            </label>

            <label className="ml-4">
              <input type="checkbox" value="Traveling" {...register('hobbies')} /> Traveling
            </label>

            <p className="text-red-500">{errors.hobbies?.message}</p>
          </div>

          {/* Job Type */}
          <select {...register('jobType')} className="border p-2 w-full">
            <option value="">Select Job</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
          </select>
          <p className="text-red-500">{errors.jobType?.message}</p>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

        </form>
      </div>
    </div>
  );
}