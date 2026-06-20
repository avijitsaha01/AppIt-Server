import { z } from 'zod';

export const createJobApplicationSchema = z.object({
  job: z.string(),
  name: z.string().min(2).max(200).trim(),
  email: z.string().email().trim(),
  phone: z.string().min(5).max(20).trim(),
  coverLetter: z.string().max(2000).trim().optional(),
});
