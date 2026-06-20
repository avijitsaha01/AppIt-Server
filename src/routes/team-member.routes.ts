import { Router } from 'express';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../controllers/team-member.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getTeamMembers);
router.post('/', authenticate, requireAdmin, upload.single('image'), createTeamMember);
router.put('/:id', authenticate, requireAdmin, upload.single('image'), updateTeamMember);
router.delete('/:id', authenticate, requireAdmin, deleteTeamMember);

export default router;
