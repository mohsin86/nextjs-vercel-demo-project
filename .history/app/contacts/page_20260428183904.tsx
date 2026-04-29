'use client';

import Navigation from '@/components/Navigation';
import { useActionState } from 'react';
import { submitForm, FormState } from './actions';

const initialState: FormState = {
  success: '',
  errors: {},
};

const inputClass =
  "w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400";

export default function ContactPage() {
  const [state, formAction] = useActionState(
    submitForm,
    initialState
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-lg p-8">
        
        {/* Navigation */}
        <div className="mb-6">
          <Navigation />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">
          Contact Form
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Welcome to the contact page!
        </p>

        <form action={formAction} className="space-y-5">

          {/* First Name */}
          <div>
            <label className="block mb-1 font-medium">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className={inputClass}
            />
            {state.errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.firstName}
              </p>
            )}
          </div>

          {/* Middle Name */}
          <div>
            <label className="block mb-1 font-medium">
              Middle Name (Optional)
            </label>
            <input
              type="text"
              name="middleName"
              className={inputClass}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 font-medium">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className={inputClass}
            />
            {state.errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={inputClass}
            />
            {state.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              className={inputClass}
            />
            {state.errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.phone}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium">
              Address
            </label>
            <textarea
              name="address"
              className={inputClass}
              rows={3}
            />
            {state.errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.address}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-medium">
              Gender
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="Male" />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="Female" />
                Female
              </label>
            </div>

            {state.errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.gender}
              </p>
            )}
          </div>

          {/* Hobbies */}
          <div>
            <label className="block mb-2 font-medium">
              Hobbies
            </label>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="hobbies" value="Reading" />
                Reading
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" name="hobbies" value="Gaming" />
                Gaming
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" name="hobbies" value="Traveling" />
                Traveling
              </label>
            </div>

            {state.errors.hobbies && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.hobbies}
              </p>
            )}
          </div>

          {/* Job Type */}
          <div>
            <label className="block mb-1 font-medium">
              Job Type
            </label>

            <select name="jobType" className={inputClass}>
              <option value="">Select Job Type</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>

            {state.errors.jobType && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.jobType}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Submit
          </button>

          {/* Success */}
          {state.success && (
            <p className="text-green-600 text-center font-medium">
              {state.success}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}