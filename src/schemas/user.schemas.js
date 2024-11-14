const { z } = require('zod');

const registerUserSchema = z.object({
  name: z
    .string({ message: 'name is required' })
    .min(1, 'Name must be at least 1 character'),
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
