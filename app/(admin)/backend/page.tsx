import { redirect } from 'next/navigation';

export default function BackendRoot() {
  redirect('/backend/dashboard');
}