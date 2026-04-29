'use client';

import Navigation from '@/components/Navigation';
import { useActionState } from 'react';
import { submitForm, FormState } from './actions';

const initialState: FormState = {
  success: '',
  errors: {},
};

export default function ContactPage() {
  const [state, formAction] = useActionState(
    submitForm,
    initialState
  );

  return (
    <div>
      <Navigation />
      <h1>Contact</h1>
      <p>Welcome to the contact page!</p>

     <h2> Register: </h2>
      <form action={formAction}>
        {/* First Name */}
        <input type="text" name="firstName" placeholder="First Name" />
        {state.errors.firstName && <p>{state.errors.firstName}</p>}

        {/* Middle Name Optional */}
        <input type="text" name="middleName" placeholder="Middle Name" />

        {/* Last Name */}
        <input type="text" name="lastName" placeholder="Last Name" />
        {state.errors.lastName && <p>{state.errors.lastName}</p>}

        {/* Email */}
        <input type="email" name="email" placeholder="Email" />
        {state.errors.email && <p>{state.errors.email}</p>}

        {/* Phone */}
        <input type="tel" name="phone" placeholder="Phone" />
        {state.errors.phone && <p>{state.errors.phone}</p>}

        {/* Address */}
        <textarea name="address" placeholder="Address"></textarea>
        {state.errors.address && <p>{state.errors.address}</p>}

        {/* Gender */}
        <div>
          <input type="radio" name="gender" value="Male" /> Male
          <input type="radio" name="gender" value="Female" /> Female
        </div>
        {state.errors.gender && <p>{state.errors.gender}</p>}

        {/* Hobbies */}
        <div>
          <input type="checkbox" name="hobbies" value="Reading" /> Reading
          <input type="checkbox" name="hobbies" value="Gaming" /> Gaming
          <input type="checkbox" name="hobbies" value="Traveling" /> Traveling
        </div>
        {state.errors.hobbies && <p>{state.errors.hobbies}</p>}

        {/* Job Type */}
        <select name="jobType">
          <option value="">Select Job Type</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {state.errors.jobType && <p>{state.errors.jobType}</p>}

        <button type="submit">Submit</button>

        {state.success && (
          <p style={{ color: 'green' }}>
            {state.success}
          </p>
        )}
      </form>
    </div>
  );
}