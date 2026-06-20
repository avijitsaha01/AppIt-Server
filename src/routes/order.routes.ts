import { Router } from 'express';
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/', authenticate, upload.single('image'), createOrder);
router.get('/my', authenticate, getMyOrders);
router.get('/', authenticate, requireAdmin, getAllOrders);
router.patch('/:id/status', authenticate, requireAdmin, updateOrderStatus);

export default router;
