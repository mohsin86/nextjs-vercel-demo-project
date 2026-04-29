'use client';

import Navigation from '@/components/Navigation';
import { useActionState } from 'react';
import { createUser, FormState } from './actions';

const initialState: FormState = {
  error: '',
  success: '',
};

export default function Contacts() {
  const [state, formAction] = useActionState(
    createUser,
    initialState
  );

  return (
    <div>
      <Navigation />
      <h1>Contact</h1>
      <p>Welcome to the contact page!</p>

<h2>Create User</h2>
      <form action={formAction}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
        />

        <button type="submit">
          Submit
        </button>

        {state.error && <p>{state.error}</p>}
        {state.success && <p>{state.success}</p>}
      </form>
    </div>
  );
}