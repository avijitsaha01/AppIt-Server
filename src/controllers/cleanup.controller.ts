import { Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { Order } from '../models/order.model.js';
import { Review } from '../models/review.model.js';
import { Ticket } from '../models/ticket.model.js';
import { Invoice } from '../models/invoice.model.js';

export async function cleanupUsers(_req: Request, res: Response) {
  const maxUsers = 20;
  const totalUsers = await User.countDocuments({ role: 'customer' });

  if (totalUsers <= maxUsers) {
    res.json({
      message: 'Cleanup not needed',
      totalCustomers: totalUsers,
      deleted: 0,
    });
    return;
  }

  const toDelete = totalUsers - maxUsers;

  const oldUsers = await User.find({ role: 'customer' })
    .sort({ createdAt: 1 })
    .limit(toDelete)
    .select('_id email');

  const ids = oldUsers.map((u) => u._id);

  const [deletedOrders, deletedReviews, deletedTickets, deletedInvoices, { deletedCount: deletedUsers }] =
    await Promise.all([
      Order.deleteMany({ user: { $in: ids } }),
      Review.deleteMany({ user: { $in: ids } }),
      Ticket.deleteMany({ user: { $in: ids } }),
      Invoice.deleteMany({ user: { $in: ids } }),
      User.deleteMany({ _id: { $in: ids } }),
    ]);

  res.json({
    message: `Deleted ${toDelete} old customer(s)`,
    deleted: toDelete,
    deletedUsers,
    details: {
      orders: deletedOrders.deletedCount,
      reviews: deletedReviews.deletedCount,
      tickets: deletedTickets.deletedCount,
      invoices: deletedInvoices.deletedCount,
    },
    clearedEmails: ids.length <= 10 ? oldUsers.map((u) => u.email) : undefined,
  });
}
