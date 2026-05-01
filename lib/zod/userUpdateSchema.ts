import { z } from 'zod';

export const userUpdateSchema = z.object({
  username: z.string().min(3).optional(),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1).optional(),

  email: z.string().email().optional(),
  phone: z.string().optional(),

  address: z.string().optional(),
  gender: z.string().optional(),
  jobType: z.string().optional(),

  hobbies: z.array(z.string()).optional(),

  profileImage: z.string().optional(),

  // DO NOT allow directly
  // password
  // role
});