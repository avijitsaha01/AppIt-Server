import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2).max(200).trim(),
  description: z.string().min(10).max(2000).trim(),
  features: z.array(z.string().trim()),
  pricing: z.string().min(1).max(200).trim(),
  trialLink: z.string().url().or(z.string().trim()).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});
