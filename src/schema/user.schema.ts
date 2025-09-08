import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
  phoneNumber: z.string().min(1, 'Phone number is required').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional()
});

export const getUserParamsSchema = z.object({
  id: z.string().transform((val) => parseInt(val))
});

export const getPaginationSchema = z.object({
  page: z.string().transform((val) => parseInt(val) || 1).optional(),
  limit: z.string().transform((val) => parseInt(val) || 10).optional()
});
