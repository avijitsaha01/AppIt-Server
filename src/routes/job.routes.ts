import { Router } from 'express';
import { getJobs, getOpenJobs, createJob, updateJob, deleteJob } from '../controllers/job.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = Router();

router.get('/open', getOpenJobs);
router.get('/', authenticate, requireAdmin, getJobs);
router.post('/', authenticate, requireAdmin, createJob);
router.put('/:id', authenticate, requireAdmin, updateJob);
router.delete('/:id', authenticate, requireAdmin, deleteJob);

export default router;
