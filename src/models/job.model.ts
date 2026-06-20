import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  location: string;
  description: string;
  requirements: string[];
  deadline: Date;
  status: 'open' | 'closed';
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship'], required: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    requirements: [{ type: String, trim: true }],
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
  },
  { timestamps: true },
);

export const Job = mongoose.model<IJob>('Job', jobSchema);
