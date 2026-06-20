import { Router } from 'express';
import { getBlogPosts, getPublishedBlogPosts, getBlogPostBySlug, createBlogPost, updateBlogPost, deleteBlogPost } from '../controllers/blog-post.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/published', getPublishedBlogPosts);
router.get('/slug/:slug', getBlogPostBySlug);
router.get('/', authenticate, requireAdmin, getBlogPosts);
router.post('/', authenticate, requireAdmin, upload.single('image'), createBlogPost);
router.put('/:id', authenticate, requireAdmin, upload.single('image'), updateBlogPost);
router.delete('/:id', authenticate, requireAdmin, deleteBlogPost);

export default router;
