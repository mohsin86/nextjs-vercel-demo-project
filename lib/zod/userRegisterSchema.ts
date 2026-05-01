import { z } from "zod";

export const userRegisterSchema = z.object({
  username: z
  .string()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscore allowed"),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  gender: z.string().min(1, "Gender is required"),
  jobType: z.string().min(1, "Job type is required"),
  hobbies: z.array(z.string()).min(1, "Select at least one hobby"),
  password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });