import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  image?: string;
  author: string;
  publishedAt?: Date;
  status: 'draft' | 'published';
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    image: { type: String },
    author: { type: String, required: true, trim: true },
    publishedAt: { type: Date },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true },
);

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema);
