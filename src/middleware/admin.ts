import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error.js';

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    throw ApiError.forbidden('Admin access required');
  }
  next();
}
