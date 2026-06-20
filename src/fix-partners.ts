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
    { name: 'bKash', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=bKash' },
    { name: 'Grameenphone', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=GP' },
    { name: 'Robi', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=Robi' },
    { name: 'Pathao', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=Pathao' },
    { name: 'Walton', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=Walton' },
    { name: 'The Daily Star', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=TDS' },
    { name: 'SSL Wireless', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=SSL' },
    { name: 'Foodpanda', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=foodpanda' },
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
