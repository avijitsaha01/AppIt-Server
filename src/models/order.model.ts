import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IOrder extends Document {
  user: Types.ObjectId;
  service: Types.ObjectId;
  name: string;
  email: string;
  companyName: string;
  details: string;
  price: number;
  image?: string;
  status: 'pending' | 'on-going' | 'done';
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    details: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String },
    status: {
      type: String,
      enum: ['pending', 'on-going', 'done'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);
