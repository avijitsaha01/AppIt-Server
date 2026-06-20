import { Router } from 'express';
import { getUserInvoices, getAllInvoices, createInvoice, updateInvoice, deleteInvoice } from '../controllers/invoice.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

router.get('/', authenticate, getUserInvoices);
router.get('/all', authenticate, requireAdmin, getAllInvoices);
router.post('/', authenticate, requireAdmin, createInvoice);
router.put('/:id', authenticate, requireAdmin, updateInvoice);
router.delete('/:id', authenticate, requireAdmin, deleteInvoice);

export default router;
