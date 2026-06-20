import { z } from 'zod';

export const createInvoiceSchema = z.object({
  order: z.string(),
  amount: z.number().positive(),
  dueDate: z.string().datetime(),
});
