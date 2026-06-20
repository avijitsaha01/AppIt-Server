import { Request, Response } from 'express';
import { Order } from '../models/order.model.js';
import { createOrderSchema, updateStatusSchema } from '../validators/order.validator.js';
import { ApiError } from '../utils/api-error.js';

export async function createOrder(req: Request, res: Response) {
  const data = createOrderSchema.parse(req.body);
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  const order = await Order.create({
    ...data,
    service: data.serviceId,
    user: req.user!.userId,
    image,
  });

  res.status(201).json({ order });
}

export async function getMyOrders(req: Request, res: Response) {
  const orders = await Order.find({ user: req.user!.userId })
    .populate('service', 'title')
    .sort('-createdAt');
  res.json({ orders });
}

export async function getAllOrders(req: Request, res: Response) {
  const orders = await Order.find()
    .populate('user', 'name email')
    .populate('service', 'title')
    .sort('-createdAt');
  res.json({ orders });
}

export async function updateOrderStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = updateStatusSchema.parse(req.body);

  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  res.json({ order });
}
