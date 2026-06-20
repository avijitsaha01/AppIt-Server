import { Request, Response } from 'express';
import { Invoice } from '../models/invoice.model.js';
import { createInvoiceSchema } from '../validators/invoice.validator.js';
import { ApiError } from '../utils/api-error.js';

export async function getUserInvoices(req: Request, res: Response) {
  const invoices = await Invoice.find({ user: req.user!.userId }).populate('order', 'name service').sort('-createdAt');
  res.json({ invoices });
}

export async function getAllInvoices(_req: Request, res: Response) {
  const invoices = await Invoice.find().populate('user', 'name email').populate('order', 'name').sort('-createdAt');
  res.json({ invoices });
}

export async function createInvoice(req: Request, res: Response) {
  const data = createInvoiceSchema.parse(req.body);
  const invoice = await Invoice.create({ ...data, user: req.user!.userId });
  res.status(201).json({ invoice });
}

export async function updateInvoice(req: Request, res: Response) {
  const { id } = req.params;
  const { status, paidAt } = req.body;
  if (!['pending', 'paid', 'overdue', 'cancelled'].includes(status)) {
    throw ApiError.badRequest('Invalid status');
  }
  const update: any = { status };
  if (status === 'paid') update.paidAt = paidAt || new Date().toISOString();
  const invoice = await Invoice.findByIdAndUpdate(id, update, { new: true });
  if (!invoice) throw ApiError.notFound('Invoice not found');
  res.json({ invoice });
}

export async function deleteInvoice(req: Request, res: Response) {
  const { id } = req.params;
  const invoice = await Invoice.findByIdAndDelete(id);
  if (!invoice) throw ApiError.notFound('Invoice not found');
  res.json({ message: 'Invoice deleted' });
}
