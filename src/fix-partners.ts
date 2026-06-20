import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';
dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);

const MONGODB_URI = process.env.MONGODB_URI!;

async function fix() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected');

  const { Partner } = await import('./models/partner.model.js');

  const updates: { name: string; logo: string }[] = [
    { name: 'bKash', logo: 'https://logo.clearbit.com/bkash.com' },
    { name: 'Grameenphone', logo: 'https://logo.clearbit.com/grameenphone.com' },
    { name: 'Robi', logo: 'https://logo.clearbit.com/robi.com.bd' },
    { name: 'Pathao', logo: 'https://logo.clearbit.com/pathao.com' },
    { name: 'Walton', logo: 'https://logo.clearbit.com/waltonbd.com' },
    { name: 'The Daily Star', logo: 'https://logo.clearbit.com/thedailystar.net' },
    { name: 'SSL Wireless', logo: 'https://logo.clearbit.com/sslwireless.com' },
    { name: 'Foodpanda', logo: 'https://logo.clearbit.com/foodpanda.com.bd' },
  ];

  for (const p of updates) {
    const r = await Partner.updateOne({ name: p.name }, { logo: p.logo });
    console.log(`${p.name}: ${r.modifiedCount} modified`);
  }

  const partners = await Partner.find({});
  partners.forEach((p: { name: string; logo: string }) => console.log(`  ${p.name} -> ${p.logo}`));

  await mongoose.disconnect();
  console.log('Done');
}

fix().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
