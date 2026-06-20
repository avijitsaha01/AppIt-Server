import { z } from 'zod';

export const createTeamMemberSchema = z.object({
  name: z.string().min(2).max(200).trim(),
  role: z.string().min(2).max(200).trim(),
  bio: z.string().min(10).max(2000).trim(),
  socialLinks: z.array(z.object({ label: z.string().trim(), url: z.string().url().or(z.string().trim()) })).optional(),
  order: z.number().int().optional(),
});
