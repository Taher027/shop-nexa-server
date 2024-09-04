import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string(),
});
const userValidationSchema = z.object({
  body: z.object({
    name: userNameValidationSchema,
    email: z.string({ message: 'email is required!' }).email(),
    password: z.string({ message: 'password is required' }).min(6),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
    gender: z.enum(['male', 'female', 'others']).optional(),
    profileImage: z.string().optional(),
  }),
});

const updateUserShcema = z.object({
  body: z
    .object({
      name: userNameValidationSchema.optional(),
      password: z.string().optional(),
      email: z.string().optional(),
      role: z.string().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
      gender: z.enum(['male', 'female', 'others']).optional(),
      profileImage: z.string().optional(),
    })
    .refine((data) => !data.email && !data.role, {
      message: 'Email and role updates are not allowed',
    }),
});

export const userValidations = {
  userValidationSchema,
  updateUserShcema,
};
