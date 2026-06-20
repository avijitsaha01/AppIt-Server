import { Request, Response } from 'express';
import { ContactRequest } from '../models/contact-request.model.js';
import { createContactRequestSchema } from '../validators/contact-request.validator.js';
import { ApiError } from '../utils/api-error.js';

export async function getContactRequests(_req: Request, res: Response) {
  const requests = await ContactRequest.find().sort('-createdAt');
  res.json({ requests });
}

export async function createContactRequest(req: Request, res: Response) {
  const data = createContactRequestSchema.parse(req.body);
  const request = await ContactRequest.create(data);
  res.status(201).json({ request });
}

export async function updateContactRequest(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;
  if (!['unread', 'read', 'replied'].includes(status)) {
    throw ApiError.badRequest('Invalid status');
  }
  const request = await ContactRequest.findByIdAndUpdate(id, { status }, { new: true });
  if (!request) throw ApiError.notFound('Contact request not found');
  res.json({ request });
}

export async function deleteContactRequest(req: Request, res: Response) {
  const { id } = req.params;
  const request = await ContactRequest.findByIdAndDelete(id);
  if (!request) throw ApiError.notFound('Contact request not found');
  res.json({ message: 'Contact request deleted' });
}
