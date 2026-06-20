import { Request, Response } from 'express';
import { Partner } from '../models/partner.model.js';
import { ApiError } from '../utils/api-error.js';

export async function getPartners(_req: Request, res: Response) {
  const partners = await Partner.find().sort('-createdAt');
  res.json({ partners });
}

export async function createPartner(req: Request, res: Response) {
  const { name } = req.body;
  const logo = req.file ? `/uploads/${req.file.filename}` : undefined;

  if (!name || !logo) {
    throw ApiError.badRequest('Name and logo are required');
  }

  const partner = await Partner.create({ name, logo });
  res.status(201).json({ partner });
}

export async function deletePartner(req: Request, res: Response) {
  const { id } = req.params;
  const partner = await Partner.findByIdAndDelete(id);
  if (!partner) {
    throw ApiError.notFound('Partner not found');
  }
  res.json({ message: 'Partner deleted' });
}
