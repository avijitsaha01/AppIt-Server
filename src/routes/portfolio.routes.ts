import { Router } from 'express';
import { getPortfolios, getPublishedPortfolios, getPortfolioBySlug, createPortfolio, updatePortfolio, deletePortfolio } from '../controllers/portfolio.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/published', getPublishedPortfolios);
router.get('/slug/:slug', getPortfolioBySlug);
router.get('/', authenticate, requireAdmin, getPortfolios);
router.post('/', authenticate, requireAdmin, upload.single('image'), createPortfolio);
router.put('/:id', authenticate, requireAdmin, upload.single('image'), updatePortfolio);
router.delete('/:id', authenticate, requireAdmin, deletePortfolio);

export default router;
