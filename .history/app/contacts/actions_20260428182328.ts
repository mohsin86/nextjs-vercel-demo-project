'use server';

export type FormState = {
  error: string;
  success: string;
};

export async function createUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;

  if (!name) {
    return {
      error: 'Name is required',
      success: '',
    };
  }

  return {
    error: '',
    success: `User ${name} created successfully`,
  };
}