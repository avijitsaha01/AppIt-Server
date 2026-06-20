import { Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import { ApiError } from '../utils/api-error.js';

export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);

  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw ApiError.conflict('Email already registered');
  }

  const hashedPassword = await hashPassword(data.password);
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  const token = generateToken({ userId: user.id, role: user.role });

  res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);

  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const valid = await comparePassword(data.password, user.password);
  if (!valid) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const token = generateToken({ userId: user.id, role: user.role });

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}

export async function getMe(req: Request, res: Response) {
  const user = await User.findById(req.user!.userId).select('-password');
  if (!user) {
    throw ApiError.notFound('User not found');
  }
  res.json({ user });
}
