import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  title: string;
  slug: string;
  description: string;
  image?: string;
  techUsed: string[];
  client?: string;
  url?: string;
  impact?: string;
  status: 'draft' | 'published';
}

const portfolioSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String },
    techUsed: [{ type: String, trim: true }],
    client: { type: String, trim: true },
    url: { type: String },
    impact: { type: String, trim: true },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true },
);

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', portfolioSchema);
