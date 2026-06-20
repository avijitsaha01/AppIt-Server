import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { ApiError } from '../utils/api-error.js';
import { User } from '../models/user.model.js';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw ApiError.unauthorized('No token provided');
  }

  const token = header.split(' ')[1];
  const decoded = verifyToken(token);

  const user = await User.findById(decoded.userId);
  if (!user) {
    throw ApiError.unauthorized('User not found');
  }

  req.user = { userId: user.id, role: user.role };
  next();
}
