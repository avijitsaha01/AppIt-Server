import { Request, Response } from 'express';
import { BlogPost } from '../models/blog-post.model.js';
import { createBlogPostSchema } from '../validators/blog-post.validator.js';
import { ApiError } from '../utils/api-error.js';
import { normalizeFormData } from '../utils/normalize-form.js';

export async function getBlogPosts(_req: Request, res: Response) {
  const posts = await BlogPost.find().sort('-createdAt');
  res.json({ posts });
}

export async function getPublishedBlogPosts(_req: Request, res: Response) {
  const posts = await BlogPost.find({ status: 'published' }).sort('-publishedAt');
  res.json({ posts });
}

export async function getBlogPostBySlug(req: Request, res: Response) {
  const post = await BlogPost.findOne({ slug: req.params.slug, status: 'published' });
  if (!post) throw ApiError.notFound('Blog post not found');
  res.json({ post });
}

export async function createBlogPost(req: Request, res: Response) {
  const data = createBlogPostSchema.parse(normalizeFormData(req.body, ['tags']));
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  const post = await BlogPost.create({ ...data, ...(data.status === 'published' && !data.publishedAt ? { publishedAt: new Date().toISOString() } : {}), image });
  res.status(201).json({ post });
}

export async function updateBlogPost(req: Request, res: Response) {
  const { id } = req.params;
  const data = createBlogPostSchema.parse(normalizeFormData(req.body, ['tags']));
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  const updateData: any = { ...data, ...(image && { image }) };
  if (data.status === 'published' && !data.publishedAt) {
    updateData.publishedAt = new Date().toISOString();
  }
  const post = await BlogPost.findByIdAndUpdate(id, updateData, { new: true });
  if (!post) throw ApiError.notFound('Blog post not found');
  res.json({ post });
}

export async function deleteBlogPost(req: Request, res: Response) {
  const { id } = req.params;
  const post = await BlogPost.findByIdAndDelete(id);
  if (!post) throw ApiError.notFound('Blog post not found');
  res.json({ message: 'Blog post deleted' });
}
