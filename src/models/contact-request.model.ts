import mongoose, { Schema, Document } from 'mongoose';

export interface IContactRequest extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
}

const contactRequestSchema = new Schema<IContactRequest>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
  },
  { timestamps: true },
);

export const ContactRequest = mongoose.model<IContactRequest>('ContactRequest', contactRequestSchema);
