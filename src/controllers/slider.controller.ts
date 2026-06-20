import { Request, Response } from 'express';
import { Slider } from '../models/slider.model.js';
import { ApiError } from '../utils/api-error.js';

export async function getSliders(_req: Request, res: Response) {
  const sliders = await Slider.find().sort('-createdAt');
  res.json({ sliders });
}

export async function createSlider(req: Request, res: Response) {
  const { title, subtitle } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  if (!image) {
    throw ApiError.badRequest('Image is required');
  }

  const slider = await Slider.create({ title, subtitle, image });
  res.status(201).json({ slider });
}

export async function deleteSlider(req: Request, res: Response) {
  const { id } = req.params;
  const slider = await Slider.findByIdAndDelete(id);
  if (!slider) {
    throw ApiError.notFound('Slider not found');
  }
  res.json({ message: 'Slider deleted' });
}
