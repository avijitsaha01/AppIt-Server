import mongoose, { Schema, Document } from 'mongoose';

export interface ISlider extends Document {
  title?: string;
  subtitle?: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const sliderSchema = new Schema<ISlider>(
  {
    title: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

export const Slider = mongoose.model<ISlider>('Slider', sliderSchema);
