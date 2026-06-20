import { z } from 'zod';

export const createContactRequestSchema = z.object({
  name: z.string().min(2).max(200).trim(),
  email: z.string().email().trim(),
  phone: z.string().max(20).trim().optional(),
  subject: z.string().min(2).max(200).trim(),
  message: z.string().min(10).max(5000).trim(),
});
