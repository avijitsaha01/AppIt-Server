import { z } from 'zod';

export const createReviewSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  designation: z.string().max(200).trim().optional(),
  description: z.string().min(10).max(2000).trim(),
  rating: z.coerce.number().min(1).max(5).optional(),
});
