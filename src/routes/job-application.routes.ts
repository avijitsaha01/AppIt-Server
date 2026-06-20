import { Router } from 'express';
import { getJobApplications, createJobApplication, updateJobApplication, deleteJobApplication } from '../controllers/job-application.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', authenticate, requireAdmin, getJobApplications);
router.post('/', upload.single('resumeFile'), createJobApplication);
router.put('/:id', authenticate, requireAdmin, updateJobApplication);
router.delete('/:id', authenticate, requireAdmin, deleteJobApplication);

export default router;
