import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReview extends Document {
  user: Types.ObjectId;
  name: string;
  designation?: string;
  description: string;
  image?: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    designation: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true },
);

export const Review = mongoose.model<IReview>('Review', reviewSchema);
