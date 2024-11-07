const { z } = require('zod');

const registerUserSchema = z.object({
  firstName: z
    .string({ message: 'firstName is required' })
    .min(1, 'First name must be at least 1 character'),
  lastName: z
    .string({ message: 'lastName is required' })
    .min(1, 'Last name must be at least 1 character'),
  email: z
    .string({ message: 'email is required' })
    .email({ message: 'Invalid Email' })
    .transform((val) => val.toLowerCase().trim()),
  password: z
    .string({ message: 'password is required' })
    .min(6, 'password must be at least 6 characters'),
});

const loginUserSchema = registerUserSchema.pick({
  email: true,
  password: true,
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
};
