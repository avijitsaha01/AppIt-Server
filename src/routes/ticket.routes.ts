import { Router } from 'express';
import { getUserTickets, getAllTickets, getTicket, createTicket, replyTicket, updateTicket, deleteTicket } from '../controllers/ticket.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

router.get('/', authenticate, getUserTickets);
router.get('/all', authenticate, requireAdmin, getAllTickets);
router.get('/:id', authenticate, getTicket);
router.post('/', authenticate, createTicket);
router.post('/:id/reply', authenticate, replyTicket);
router.put('/:id', authenticate, requireAdmin, updateTicket);
router.delete('/:id', authenticate, requireAdmin, deleteTicket);

export default router;
