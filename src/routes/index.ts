import { Router } from 'express';
import authRoutes from './auth.routes.js';
import orderRoutes from './order.routes.js';
import serviceRoutes from './service.routes.js';
import partnerRoutes from './partner.routes.js';
import sliderRoutes from './slider.routes.js';
import reviewRoutes from './review.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/services', serviceRoutes);
router.use('/partners', partnerRoutes);
router.use('/sliders', sliderRoutes);
router.use('/reviews', reviewRoutes);
router.use('/admin', adminRoutes);

export default router;
