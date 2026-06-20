import { z } from 'zod';

export const createBlogPostSchema = z.object({
  title: z.string().min(2).max(200).trim(),
  slug: z.string().min(2).max(200).trim().regex(/^[a-z0-9-]+$/),
  content: z.string().min(10),
  excerpt: z.string().min(10).max(500).trim(),
  tags: z.array(z.string().trim()).optional(),
  author: z.string().min(2).max(100).trim(),
  publishedAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'published']).optional(),
});
