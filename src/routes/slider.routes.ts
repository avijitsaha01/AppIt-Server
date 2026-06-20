import { Router } from 'express';
import { getSliders, createSlider, deleteSlider } from '../controllers/slider.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getSliders);
router.post('/', authenticate, requireAdmin, upload.single('image'), createSlider);
router.delete('/:id', authenticate, requireAdmin, deleteSlider);

export default router;
