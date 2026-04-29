'use server';

export type FormState = {
  success: string;
  errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    gender?: string;
    hobbies?: string;
    jobType?: string;
  };
  data: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    gender?: string;
    hobbies?: string[];
    jobType?: string;
  };
};

export async function submitForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const firstName = formData.get('firstName') as string;
  const middleName = formData.get('middleName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const gender = formData.get('gender') as string;
  const jobType = formData.get('jobType') as string;

  const hobbies = formData.getAll('hobbies') as string[];

  const data = {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    address,
    gender,
    jobType,
    hobbies,
  };

  const errors: FormState["errors"] = {};

  if (!firstName) errors.firstName = "First name is required";
  if (!lastName) errors.lastName = "Last name is required";
  if (!email) errors.email = "Email is required";
  if (!phone) errors.phone = "Phone is required";
  if (!address) errors.address = "Address is required";
  if (!gender) errors.gender = "Gender is required";
  if (!jobType) errors.jobType = "Job type is required";
  if (hobbies.length === 0) errors.hobbies = "Select at least one hobby";

  // ❌ IF ERROR → return DATA + ERRORS
  if (Object.keys(errors).length > 0) {
    return {
      success: "",
      errors,
      data,
    };
  }

  // ✅ SUCCESS
  console.log(data);

  return {
    success: "Form submitted successfully!",
    errors: {},
    data: {}, // optional reset after success
  };
}