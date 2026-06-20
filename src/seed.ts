import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';
import { hashPassword } from './utils/password.js';
import { User } from './models/user.model.js';
import { Service } from './models/service.model.js';
import { Partner } from './models/partner.model.js';
import { Slider } from './models/slider.model.js';
import { Review } from './models/review.model.js';
import { Order } from './models/order.model.js';

dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);

const MONGODB_URI = process.env.MONGODB_URI!;

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Service.deleteMany({}),
    Partner.deleteMany({}),
    Slider.deleteMany({}),
    Review.deleteMany({}),
    Order.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  const admin = await User.create({
    name: 'Admin',
    email: 'admin@appit.com',
    password: adminPassword,
    role: 'admin',
  });
  console.log('Admin created: admin@appit.com / admin123');

  // Create regular users
  const userPassword = await hashPassword('user123');
  const user1 = await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: userPassword,
    role: 'customer',
  });
  const user2 = await User.create({
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: userPassword,
    role: 'customer',
  });
  console.log('Sample users created');

  // Create services
  const services = await Service.insertMany([
    {
      title: 'Web & Mobile Development',
      description: 'Full-stack web applications and cross-platform mobile apps built with modern frameworks. From responsive websites to progressive web apps, we deliver pixel-perfect solutions.',
      icon: 'Code',
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design that drives engagement. We create intuitive interfaces, wireframes, prototypes, and design systems that bring your vision to life.',
      icon: 'Palette',
    },
    {
      title: 'Cloud & DevOps',
      description: 'Scalable cloud infrastructure, CI/CD pipelines, container orchestration, and monitoring. We ensure your applications run smoothly at any scale.',
      icon: 'Cloud',
    },
    {
      title: 'Data Science & AI',
      description: 'Machine learning models, data pipelines, analytics dashboards, and intelligent automation. Turn your data into actionable insights.',
      icon: 'Brain',
    },
    {
      title: 'Cybersecurity',
      description: 'Penetration testing, security audits, compliance consulting, and real-time threat monitoring. Keep your digital assets safe.',
      icon: 'Shield',
    },
    {
      title: 'Digital Marketing',
      description: 'SEO optimization, social media management, content strategy, and paid advertising campaigns. Grow your online presence and reach.',
      icon: 'Megaphone',
    },
  ]);
  console.log(`${services.length} services created`);

  // Create partners
  const partners = await Partner.insertMany([
    { name: 'Google', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg' },
    { name: 'Microsoft', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg' },
    { name: 'Amazon', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazon.svg' },
    { name: 'Netflix', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/netflix.svg' },
    { name: 'Airbnb', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/airbnb.svg' },
    { name: 'Slack', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg' },
    { name: 'Uber', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/uber.svg' },
    { name: 'Spotify', logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/spotify.svg' },
  ]);
  console.log(`${partners.length} partners created`);

  // Create sliders
  const sliders = await Slider.insertMany([
    {
      title: 'Innovative Solutions',
      subtitle: 'Transforming ideas into powerful digital experiences',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    },
    {
      title: 'Expert Team',
      subtitle: 'Dedicated professionals committed to your success',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    },
    {
      title: 'Global Reach',
      subtitle: 'Serving clients worldwide with cutting-edge technology',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    },
  ]);
  console.log(`${sliders.length} sliders created`);

  // Create reviews
  const reviews = await Review.insertMany([
    {
      user: user1._id,
      name: 'John Doe',
      designation: 'CEO, TechStart Inc.',
      description: 'AppIt transformed our business with their incredible web application. The team was professional, responsive, and delivered beyond our expectations. Highly recommended!',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=68',
    },
    {
      user: user2._id,
      name: 'Jane Smith',
      designation: 'Product Manager, CloudNine',
      description: 'Working with AppIt was a game-changer for our product. Their UI/UX design expertise helped us increase user engagement by 40%. Truly outstanding work.',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=47',
    },
    {
      user: admin._id,
      name: 'Sarah Johnson',
      designation: 'Founder, DataVault',
      description: 'The cloud infrastructure setup by AppIt saved us thousands in operational costs. Their DevOps team is world-class. We have been partners for over 2 years now.',
      rating: 4,
      image: 'https://i.pravatar.cc/150?img=23',
    },
  ]);
  console.log(`${reviews.length} reviews created`);

  // Create sample orders
  const orders = await Order.insertMany([
    {
      user: user1._id,
      service: services[0]._id,
      name: 'John Doe',
      email: 'john@example.com',
      companyName: 'TechStart Inc.',
      details: 'We need a full-stack e-commerce platform with inventory management, payment integration, and admin dashboard. Timeline: 3 months.',
      price: 15000,
      status: 'on-going',
    },
    {
      user: user1._id,
      service: services[1]._id,
      name: 'John Doe',
      email: 'john@example.com',
      companyName: 'TechStart Inc.',
      details: 'Complete UI/UX redesign of our SaaS product. We need modern, clean interface with improved user flow and accessibility compliance.',
      price: 8000,
      status: 'done',
    },
    {
      user: user2._id,
      service: services[2]._id,
      name: 'Jane Smith',
      email: 'jane@example.com',
      companyName: 'CloudNine',
      details: 'Migrate our infrastructure to AWS with Kubernetes orchestration, automated CI/CD pipeline setup, and 24/7 monitoring configuration.',
      price: 22000,
      status: 'pending',
    },
    {
      user: user2._id,
      service: services[3]._id,
      name: 'Jane Smith',
      email: 'jane@example.com',
      companyName: 'CloudNine',
      details: 'Build a customer churn prediction model using machine learning. Integrate with existing CRM and create real-time analytics dashboard.',
      price: 18000,
      status: 'pending',
    },
    {
      user: admin._id,
      service: services[4]._id,
      name: 'Sarah Johnson',
      email: 'sarah@datavault.io',
      companyName: 'DataVault',
      details: 'Full security audit including penetration testing, vulnerability assessment, compliance review (SOC 2), and remediation recommendations.',
      price: 12000,
      status: 'on-going',
    },
  ]);
  console.log(`${orders.length} orders created`);

  await mongoose.disconnect();
  console.log('\nSeed completed successfully!');
  console.log('---');
  console.log('Admin login: admin@appit.com / admin123');
  console.log('User login:  john@example.com / user123');
  console.log('User login:  jane@example.com / user123');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
