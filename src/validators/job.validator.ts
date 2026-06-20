import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string().min(2).max(200).trim(),
  type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  location: z.string().min(2).max(200).trim(),
  description: z.string().min(10),
  requirements: z.array(z.string().trim()),
  deadline: z.string().datetime(),
  status: z.enum(['open', 'closed']).optional(),
});
