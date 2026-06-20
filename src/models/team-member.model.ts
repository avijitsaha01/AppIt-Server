import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  bio: string;
  image?: string;
  socialLinks?: { label: string; url: string }[];
  order: number;
}

const teamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    image: { type: String },
    socialLinks: [{ label: String, url: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const TeamMember = mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);
