import { Router } from 'express';
import { getPartners, createPartner, deletePartner } from '../controllers/partner.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getPartners);
router.post('/', authenticate, requireAdmin, upload.single('logo'), createPartner);
router.delete('/:id', authenticate, requireAdmin, deletePartner);

export default router;
