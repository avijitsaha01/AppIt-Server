import { Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/api-error.js';

export async function makeAdmin(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) {
    throw ApiError.badRequest('Email is required');
  }

  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: 'admin' },
    { new: true },
  );

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  res.json({ message: 'Admin added successfully', user: { id: user.id, email: user.email, role: user.role } });
}

export async function removeAdmin(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) {
    throw ApiError.badRequest('Email is required');
  }

  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: 'customer' },
    { new: true },
  );

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  res.json({ message: 'Admin removed', user: { id: user.id, email: user.email, role: user.role } });
}

export async function getUsers(req: Request, res: Response) {
  const users = await User.find().select('-password').sort('-createdAt');
  res.json({ users });
}
