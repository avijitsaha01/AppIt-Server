import { Router } from 'express';
import { makeAdmin, removeAdmin, getUsers } from '../controllers/admin.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

router.post('/make-admin', authenticate, requireAdmin, makeAdmin);
router.post('/remove-admin', authenticate, requireAdmin, removeAdmin);
router.get('/users', authenticate, requireAdmin, getUsers);

export default router;
