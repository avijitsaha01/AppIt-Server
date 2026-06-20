import { Router } from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/service.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getServices);
router.post('/', authenticate, requireAdmin, upload.single('image'), createService);
router.put('/:id', authenticate, requireAdmin, upload.single('image'), updateService);
router.delete('/:id', authenticate, requireAdmin, deleteService);

export default router;
