// app/actions.ts

'use server';

export async function createUser(
  prevState: any,
  formData: FormData
) {
  const name = formData.get('name');

  if (!name) {
    return {
      error: 'Name is required',
    };
  }

  return {
    success: `User ${name} created successfully`,
  };
}