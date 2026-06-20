import { Request, Response } from 'express';
import { Review } from '../models/review.model.js';
import { createReviewSchema } from '../validators/review.validator.js';

export async function getReviews(_req: Request, res: Response) {
  const reviews = await Review.find().populate('user', 'name email').sort('-createdAt');
  res.json({ reviews });
}

export async function createReview(req: Request, res: Response) {
  const data = createReviewSchema.parse(req.body);
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  const review = await Review.create({
    ...data,
    image,
    user: req.user!.userId,
  });

  res.status(201).json({ review });
}
