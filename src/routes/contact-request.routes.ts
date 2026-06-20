import { Router } from 'express';
import { getContactRequests, createContactRequest, updateContactRequest, deleteContactRequest } from '../controllers/contact-request.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

router.get('/', authenticate, requireAdmin, getContactRequests);
router.post('/', createContactRequest);
router.put('/:id', authenticate, requireAdmin, updateContactRequest);
router.delete('/:id', authenticate, requireAdmin, deleteContactRequest);

export default router;
