import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
}

const partnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, required: true },
  },
  { timestamps: true },
);

export const Partner = mongoose.model<IPartner>('Partner', partnerSchema);
