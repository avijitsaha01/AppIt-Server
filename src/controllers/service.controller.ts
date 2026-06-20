import { Request, Response } from 'express';
import { Service } from '../models/service.model.js';
import { createServiceSchema } from '../validators/service.validator.js';
import { ApiError } from '../utils/api-error.js';

export async function getServices(_req: Request, res: Response) {
  const services = await Service.find().sort('-createdAt');
  res.json({ services });
}

export async function createService(req: Request, res: Response) {
  const data = createServiceSchema.parse(req.body);
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  const service = await Service.create({ ...data, image });
  res.status(201).json({ service });
}

export async function updateService(req: Request, res: Response) {
  const { id } = req.params;
  const data = createServiceSchema.parse(req.body);
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  const service = await Service.findByIdAndUpdate(id, { ...data, ...(image && { image }) }, { new: true });
  if (!service) {
    throw ApiError.notFound('Service not found');
  }
  res.json({ service });
}

export async function deleteService(req: Request, res: Response) {
  const { id } = req.params;
  const service = await Service.findByIdAndDelete(id);
  if (!service) {
    throw ApiError.notFound('Service not found');
  }
  res.json({ message: 'Service deleted' });
}
