import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
