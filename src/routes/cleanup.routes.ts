import { Router } from 'express';
import { cleanupUsers } from '../controllers/cleanup.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

router.post('/users', authenticate, requireAdmin, cleanupUsers);

export default router;
