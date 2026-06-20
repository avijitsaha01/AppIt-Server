import { z } from 'zod';

export const createTicketSchema = z.object({
  subject: z.string().min(2).max(200).trim(),
  message: z.string().min(10).max(5000).trim(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export const replyTicketSchema = z.object({
  message: z.string().min(1).max(5000).trim(),
});
