import { z } from 'zod';

export const createOrderSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  companyName: z.string().min(2).max(200).trim(),
  details: z.string().min(10).max(2000).trim(),
  price: z.coerce.number().positive(),
  serviceId: z.string(),
});

export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'on-going', 'done']),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
