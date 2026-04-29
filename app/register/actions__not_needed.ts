'use server';

import { userRegisterSchema } from '@/lib/userRegisterSchema';

export type FormState = {
  success: string;
  errors: Record<string, string>;
  data: Record<string, unknown>;
};

export async function submitForm(prevState: FormState, formData: FormData) {
  const rawData = {
    firstName: formData.get('firstName'),
    middleName: formData.get('middleName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    gender: formData.get('gender'),
    jobType: formData.get('jobType'),
    hobbies: formData.getAll('hobbies'),
  };

  // 🔥 ZOD VALIDATION (SERVER SIDE)

  const result = userRegisterSchema.safeParse(rawData);
  
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    result.error.issues.forEach((err) => {
      const field = String(err.path[0]);
      fieldErrors[field] = err.message;
    });

    return {
      success: '',
      errors: fieldErrors,
      data: rawData, // 👈 keep form filled
    };
  }

  // ✅ SUCCESS
  //console.log(result.data);

  return {
    success: 'Form submitted successfully!',
    errors: {},
    data: {}, // optional reset
  };
}