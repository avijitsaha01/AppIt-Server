import { Router } from 'express';
import { getProducts, getActiveProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/active', getActiveProducts);
router.get('/', authenticate, requireAdmin, getProducts);
router.post('/', authenticate, requireAdmin, upload.single('image'), createProduct);
router.put('/:id', authenticate, requireAdmin, upload.single('image'), updateProduct);
router.delete('/:id', authenticate, requireAdmin, deleteProduct);

export default router;
