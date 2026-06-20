import { z } from 'zod';

export const createServiceSchema = z.object({
  title: z.string().min(2).max(200).trim(),
  description: z.string().min(10).max(2000).trim(),
  icon: z.string().optional(),
});
