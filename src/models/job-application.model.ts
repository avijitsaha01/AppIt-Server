import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IJobApplication extends Document {
  job: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  resumeFile?: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
}

const jobApplicationSchema = new Schema<IJobApplication>(
  {
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    resumeFile: { type: String },
    coverLetter: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'rejected'], default: 'pending' },
  },
  { timestamps: true },
);

export const JobApplication = mongoose.model<IJobApplication>('JobApplication', jobApplicationSchema);
