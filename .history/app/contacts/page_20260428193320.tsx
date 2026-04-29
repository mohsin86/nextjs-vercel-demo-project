'use client';

import Navigation from '@/components/Navigation';
import { useActionState } from 'react';
import { submitForm, FormState } from './actions';

const initialState: FormState = {
  success: '',
  errors: {},
  data: {
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
};

export default function ContactPage() {
  const [state, formAction] = useActionState(
    submitForm,
    initialState
  );

  const d = state.data || {};

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      
      {/* CARD */}
      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-xl shadow-xl p-8">
        
        <div className="mb-6">
          <Navigation />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Contact Form
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Fill all required details
        </p>

        <form action={formAction} className="space-y-5">

          {/* INPUT STYLE FIX */}
          {/** IMPORTANT FIX BELOW **/}

          <div>
            <label className="block mb-1 font-medium text-gray-700">First Name</label>
            <input
              name="firstName"
              defaultValue={d.firstName || ''}
              className="w-full border border-gray-400 bg-white text-black p-2 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {state.errors.firstName && (
              <p className="text-red-500 text-sm">{state.errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Middle Name</label>
            <input
                name="middleName"
                defaultValue={d.middleName || ''}
                className="w-full border border-gray-400 bg-white text-black p-2 rounded-md"
              />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Last Name</label>
           <input
              name="lastName"
              defaultValue={d.lastName || ''}
              className="w-full border border-gray-400 bg-white text-black p-2 rounded-md"
            />
            {state.errors.lastName && (
              <p className="text-red-500 text-sm">{state.errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
                name="email"
                type="email"
                defaultValue={d.email || ''}
                className="w-full border border-gray-400 bg-white text-black p-2 rounded-md"
              />
            {state.errors.email && (
              <p className="text-red-500 text-sm">{state.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone</label>
            <input
              name="phone"
              defaultValue={d.phone || ''}
              className="w-full border border-gray-400 bg-white text-black p-2 rounded-md"
            />
            {state.errors.phone && (
              <p className="text-red-500 text-sm">{state.errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              defaultValue={d.address || ''}
              className="w-full border border-gray-400 bg-white text-black p-2 rounded-md"
            />
            {state.errors.address && (
              <p className="text-red-500 text-sm">{state.errors.address}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Gender
            </label>

            <div className="flex gap-6 text-black">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  defaultChecked={d.gender === 'Male'}
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                    type="radio"
                    name="gender"
                    value="Female"
                    defaultChecked={d.gender === 'Female'}
                  />
                Female
              </label>
            </div>

            {state.errors.gender && (
              <p className="text-red-500 text-sm">{state.errors.gender}</p>
            )}
          </div>

          {/* Hobbies */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Hobbies
            </label>

            <div className="flex flex-col gap-2 text-black">
              <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="hobbies"
                    value="Reading"
                    defaultChecked={d.hobbies?.includes('Reading')}
                  />
                Reading
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hobbies"
                  value="Gaming"
                  defaultChecked={d.hobbies?.includes('Gaming')}
                />
                Gaming
              </label>

              <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="hobbies"
                    value="Traveling"
                    defaultChecked={d.hobbies?.includes('Traveling')}
                  />
                Traveling
              </label>
            </div>

            {state.errors.hobbies && (
              <p className="text-red-500 text-sm">{state.errors.hobbies}</p>
            )}
          </div>

          {/* Job Type */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Job Type
            </label>

            <select
                  name="jobType"
                  defaultValue={d.jobType || ''}
                  className="w-full border border-gray-400 bg-white text-black p-2 rounded-md"
                >
              <option value="">Select Job Type</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>

            {state.errors.jobType && (
              <p className="text-red-500 text-sm">{state.errors.jobType}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
          >
            Submit
          </button>

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