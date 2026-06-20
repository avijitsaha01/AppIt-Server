import { Request, Response } from 'express';
import { Product } from '../models/product.model.js';
import { createProductSchema } from '../validators/product.validator.js';
import { ApiError } from '../utils/api-error.js';
import { normalizeFormData } from '../utils/normalize-form.js';

export async function getProducts(_req: Request, res: Response) {
  const products = await Product.find().sort('-createdAt');
  res.json({ products });
}

export async function getActiveProducts(_req: Request, res: Response) {
  const products = await Product.find({ status: 'active' }).sort('-createdAt');
  res.json({ products });
}

export async function createProduct(req: Request, res: Response) {
  const data = createProductSchema.parse(normalizeFormData(req.body, ['features']));
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  const product = await Product.create({ ...data, image });
  res.status(201).json({ product });
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const data = createProductSchema.parse(normalizeFormData(req.body, ['features']));
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  const product = await Product.findByIdAndUpdate(id, { ...data, ...(image && { image }) }, { new: true });
  if (!product) throw ApiError.notFound('Product not found');
  res.json({ product });
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw ApiError.notFound('Product not found');
  res.json({ message: 'Product deleted' });
}
