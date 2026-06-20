import { Request, Response } from 'express';
import { Portfolio } from '../models/portfolio.model.js';
import { createPortfolioSchema } from '../validators/portfolio.validator.js';
import { ApiError } from '../utils/api-error.js';
import { normalizeFormData } from '../utils/normalize-form.js';

export async function getPortfolios(_req: Request, res: Response) {
  const portfolios = await Portfolio.find().sort('-createdAt');
  res.json({ portfolios });
}

export async function getPublishedPortfolios(_req: Request, res: Response) {
  const portfolios = await Portfolio.find({ status: 'published' }).sort('-createdAt');
  res.json({ portfolios });
}

export async function getPortfolioBySlug(req: Request, res: Response) {
  const portfolio = await Portfolio.findOne({ slug: req.params.slug, status: 'published' });
  if (!portfolio) throw ApiError.notFound('Portfolio not found');
  res.json({ portfolio });
}

export async function createPortfolio(req: Request, res: Response) {
  const data = createPortfolioSchema.parse(normalizeFormData(req.body, ['techUsed']));
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  const portfolio = await Portfolio.create({ ...data, image });
  res.status(201).json({ portfolio });
}

export async function updatePortfolio(req: Request, res: Response) {
  const { id } = req.params;
  const data = createPortfolioSchema.parse(normalizeFormData(req.body, ['techUsed']));
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  const portfolio = await Portfolio.findByIdAndUpdate(id, { ...data, ...(image && { image }) }, { new: true });
  if (!portfolio) throw ApiError.notFound('Portfolio not found');
  res.json({ portfolio });
}

export async function deletePortfolio(req: Request, res: Response) {
  const { id } = req.params;
  const portfolio = await Portfolio.findByIdAndDelete(id);
  if (!portfolio) throw ApiError.notFound('Portfolio not found');
  res.json({ message: 'Portfolio deleted' });
}
