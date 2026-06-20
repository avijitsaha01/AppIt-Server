import { z } from 'zod';

export const createPortfolioSchema = z.object({
  title: z.string().min(2).max(200).trim(),
  slug: z.string().min(2).max(200).trim().regex(/^[a-z0-9-]+$/),
  description: z.string().min(10).max(2000).trim(),
  techUsed: z.array(z.string().trim()),
  client: z.string().max(200).trim().optional(),
  url: z.string().url().or(z.string().trim()).optional(),
  impact: z.string().max(500).trim().optional(),
  status: z.enum(['draft', 'published']).optional(),
});
