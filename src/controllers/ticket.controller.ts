import { Request, Response } from 'express';
import { Ticket } from '../models/ticket.model.js';
import { createTicketSchema, replyTicketSchema } from '../validators/ticket.validator.js';
import { ApiError } from '../utils/api-error.js';

export async function getUserTickets(req: Request, res: Response) {
  const tickets = await Ticket.find({ user: req.user!.userId }).sort('-createdAt');
  res.json({ tickets });
}

export async function getAllTickets(_req: Request, res: Response) {
  const tickets = await Ticket.find().populate('user', 'name email').sort('-createdAt');
  res.json({ tickets });
}

export async function getTicket(req: Request, res: Response) {
  const { id } = req.params;
  const ticket = await Ticket.findById(id).populate('user', 'name email').populate('replies.user', 'name email');
  if (!ticket) throw ApiError.notFound('Ticket not found');
  if (ticket.user._id.toString() !== req.user!.userId && req.user!.role !== 'admin') {
    throw ApiError.forbidden('Access denied');
  }
  res.json({ ticket });
}

export async function createTicket(req: Request, res: Response) {
  const data = createTicketSchema.parse(req.body);
  const ticket = await Ticket.create({ ...data, user: req.user!.userId });
  res.status(201).json({ ticket });
}

export async function replyTicket(req: Request, res: Response) {
  const { id } = req.params;
  const data = replyTicketSchema.parse(req.body);
  const ticket = await Ticket.findById(id);
  if (!ticket) throw ApiError.notFound('Ticket not found');
  ticket.replies.push({ user: req.user!.userId as any, message: data.message, createdAt: new Date() });
  if (ticket.status === 'open' || ticket.status === 'resolved') {
    ticket.status = 'in-progress';
  }
  await ticket.save();
  res.json({ ticket });
}

export async function updateTicket(req: Request, res: Response) {
  const { id } = req.params;
  const { status, priority } = req.body;
  const update: any = {};
  if (status && ['open', 'in-progress', 'resolved', 'closed'].includes(status)) update.status = status;
  if (priority && ['low', 'medium', 'high'].includes(priority)) update.priority = priority;
  const ticket = await Ticket.findByIdAndUpdate(id, update, { new: true });
  if (!ticket) throw ApiError.notFound('Ticket not found');
  res.json({ ticket });
}

export async function deleteTicket(req: Request, res: Response) {
  const { id } = req.params;
  const ticket = await Ticket.findByIdAndDelete(id);
  if (!ticket) throw ApiError.notFound('Ticket not found');
  res.json({ message: 'Ticket deleted' });
}
