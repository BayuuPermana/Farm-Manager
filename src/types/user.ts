import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user', 'manager']),
  createdAt: z.date()
});

export type User = z.infer<typeof UserSchema>;

export type SortDirection = 'asc' | 'desc';
export type SortField = keyof Omit<User, 'id' | 'createdAt'>;