import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  image?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String },
    icon: { type: String },
  },
  { timestamps: true },
);

export const Service = mongoose.model<IService>('Service', serviceSchema);
