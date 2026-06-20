import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReply {
  user: Types.ObjectId;
  message: string;
  createdAt: Date;
}

export interface ITicket extends Document {
  user: Types.ObjectId;
  subject: string;
  message: string;
  replies: IReply[];
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
}

const replySchema = new Schema<IReply>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const ticketSchema = new Schema<ITicket>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    replies: [replySchema],
    status: { type: String, enum: ['open', 'in-progress', 'resolved', 'closed'], default: 'open' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  },
  { timestamps: true },
);

export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);
