import { Router } from 'express';
import { getReviews, createReview } from '../controllers/review.controller.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getReviews);
router.post('/', authenticate, upload.single('image'), createReview);

export default router;
