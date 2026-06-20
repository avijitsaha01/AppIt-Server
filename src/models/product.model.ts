import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  features: string[];
  image?: string;
  pricing: string;
  trialLink?: string;
  status: 'active' | 'inactive';
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    features: [{ type: String, trim: true }],
    image: { type: String },
    pricing: { type: String, required: true, trim: true },
    trialLink: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
