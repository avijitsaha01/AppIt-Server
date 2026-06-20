import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInvoice extends Document {
  user: Types.ObjectId;
  order: Types.ObjectId;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: Date;
  paidAt?: Date;
}

const invoiceSchema = new Schema<IInvoice>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'overdue', 'cancelled'], default: 'pending' },
    dueDate: { type: Date, required: true },
    paidAt: { type: Date },
  },
  { timestamps: true },
);

export const Invoice = mongoose.model<IInvoice>('Invoice', invoiceSchema);
