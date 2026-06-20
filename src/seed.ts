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
import { TeamMember } from './models/team-member.model.js';
import { BlogPost } from './models/blog-post.model.js';
import { Portfolio } from './models/portfolio.model.js';
import { Product } from './models/product.model.js';
import { Job } from './models/job.model.js';
import { JobApplication } from './models/job-application.model.js';
import { ContactRequest } from './models/contact-request.model.js';
import { Ticket } from './models/ticket.model.js';
import { Invoice } from './models/invoice.model.js';

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
    TeamMember.deleteMany({}),
    BlogPost.deleteMany({}),
    Portfolio.deleteMany({}),
    Product.deleteMany({}),
    Job.deleteMany({}),
    JobApplication.deleteMany({}),
    ContactRequest.deleteMany({}),
    Ticket.deleteMany({}),
    Invoice.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  // ── Users ──
  const adminPassword = await hashPassword('admin123');
  const userPassword = await hashPassword('user123');

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@appit.com',
    password: adminPassword,
    role: 'admin',
  });
  console.log('Admin created: admin@appit.com / admin123');

  const user1 = await User.create({
    name: 'Kabir Hossain',
    email: 'kabir@example.com',
    password: userPassword,
    role: 'customer',
  });
  const user2 = await User.create({
    name: 'Nusrat Jahan',
    email: 'nusrat@example.com',
    password: userPassword,
    role: 'customer',
  });
  const user3 = await User.create({
    name: 'Tanvir Ahmed',
    email: 'tanvir@example.com',
    password: userPassword,
    role: 'customer',
  });
  console.log('Sample users created');

  // ── Services ──
  const services = await Service.insertMany([
    {
      title: 'Web & Mobile Development',
      description: 'Full-stack web applications and cross-platform mobile apps built with modern frameworks. From responsive websites to progressive web apps, we deliver pixel-perfect solutions for Bangladeshi businesses.',
      icon: 'Code',
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design that drives engagement. We create intuitive interfaces, wireframes, prototypes, and design systems tailored for the Bangladeshi market.',
      icon: 'Palette',
    },
    {
      title: 'Cloud & DevOps',
      description: 'Scalable cloud infrastructure on AWS/GCP, CI/CD pipelines, container orchestration, and monitoring. We help Bangladeshi startups scale with confidence.',
      icon: 'Cloud',
    },
    {
      title: 'Data Science & AI',
      description: 'Machine learning models, data pipelines, analytics dashboards, and intelligent automation purpose-built for Bangladesh\'s growing digital economy.',
      icon: 'Brain',
    },
    {
      title: 'Cybersecurity',
      description: 'Penetration testing, security audits, compliance consulting, and real-time threat monitoring. We help Bangladeshi organisations meet BGD e-GOV compliance.',
      icon: 'Shield',
    },
    {
      title: 'Digital Marketing',
      description: 'SEO, social media management, content strategy, and paid advertising campaigns to grow your brand across Bangladesh and beyond.',
      icon: 'Megaphone',
    },
  ]);
  console.log(`${services.length} services created`);

  // ── Partners ──
  const partners = await Partner.insertMany([
    { name: 'bKash', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=bKash' },
    { name: 'Grameenphone', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=GP' },
    { name: 'Robi', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=Robi' },
    { name: 'Pathao', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=Pathao' },
    { name: 'Walton', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=Walton' },
    { name: 'The Daily Star', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=TDS' },
    { name: 'SSL Wireless', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=SSL' },
    { name: 'Foodpanda', logo: 'https://placehold.co/160x40/1a1a2e/ffffff?text=foodpanda' },
  ]);
  console.log(`${partners.length} partners created`);

  // ── Sliders ──
  const sliders = await Slider.insertMany([
    {
      title: 'Digital Transformation in Bangladesh',
      subtitle: 'Empowering local businesses with world-class technology solutions',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    },
    {
      title: 'Made in Bangladesh, for the World',
      subtitle: 'Our expert team delivers innovative solutions from Dhaka to global markets',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    },
    {
      title: 'Driving the Smart Bangladesh Vision',
      subtitle: 'Building the digital infrastructure for Bangladesh\'s future',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80',
    },
  ]);
  console.log(`${sliders.length} sliders created`);

  // ── Reviews ──
  const reviews = await Review.insertMany([
    {
      user: user1._id,
      name: 'Kabir Hossain',
      designation: 'CEO, Shikho Technologies',
      description: 'AppIt completely transformed our edtech platform. Their web development team in Dhaka built a scalable solution that handles 50,000+ daily users. Outstanding quality and support!',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=68',
    },
    {
      user: user2._id,
      name: 'Nusrat Jahan',
      designation: 'Product Lead, Chaldal',
      description: 'The UI/UX redesign by AppIt boosted our conversion rate by 35%. They deeply understand the Bangladeshi consumer and delivered a beautiful, intuitive interface.',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=47',
    },
    {
      user: user3._id,
      name: 'Tanvir Ahmed',
      designation: 'CTO, Sheba Platform',
      description: 'AppIt\'s DevOps team migrated our entire infrastructure to AWS with zero downtime. Their 24/7 monitoring has been rock solid. Best decision we made for our platform.',
      rating: 4,
      image: 'https://i.pravatar.cc/150?img=23',
    },
  ]);
  console.log(`${reviews.length} reviews created`);

  // ── Team Members ──
  const teamMembers = await TeamMember.insertMany([
    {
      name: 'Arefin Karim',
      role: 'CEO & Founder',
      bio: '15+ years in the IT industry. Previously led engineering teams at GP and Pathao. Passionate about building Bangladesh\'s digital future.',
      image: 'https://i.pravatar.cc/300?img=11',
      socialLinks: [
        { label: 'LinkedIn', url: '#' },
        { label: 'Twitter', url: '#' },
      ],
      order: 1,
    },
    {
      name: 'Farzana Rahman',
      role: 'CTO',
      bio: 'Full-stack architect with expertise in cloud infrastructure. Former senior engineer at bKash. Leads our technical strategy and R&D.',
      image: 'https://i.pravatar.cc/300?img=16',
      socialLinks: [{ label: 'LinkedIn', url: '#' }],
      order: 2,
    },
    {
      name: 'Shahriar Islam',
      role: 'Head of Design',
      bio: 'Award-winning UI/UX designer with 10+ years of experience. Previously designed for Robi and The Daily Star. Believes in human-centered design.',
      image: 'https://i.pravatar.cc/300?img=33',
      socialLinks: [
        { label: 'LinkedIn', url: '#' },
        { label: 'Dribbble', url: '#' },
      ],
      order: 3,
    },
    {
      name: 'Tahmina Akhter',
      role: 'VP of Engineering',
      bio: 'Leads our engineering team with a focus on clean code and agile delivery. Expert in React, Node.js, and cloud-native architecture.',
      image: 'https://i.pravatar.cc/300?img=44',
      socialLinks: [{ label: 'LinkedIn', url: '#' }],
      order: 4,
    },
    {
      name: 'Rafiq Hasan',
      role: 'Head of AI & Data',
      bio: 'PhD in Machine Learning from BUET. Previously built ML models for SSL Wireless. Drives our AI and data science initiatives.',
      image: 'https://i.pravatar.cc/300?img=55',
      socialLinks: [{ label: 'LinkedIn', url: '#' }],
      order: 5,
    },
    {
      name: 'Shamima Yasmin',
      role: 'Head of Marketing',
      bio: 'Digital marketing strategist with expertise in growth hacking. Grew multiple Bangladeshi startups from 0 to 100K users.',
      image: 'https://i.pravatar.cc/300?img=26',
      socialLinks: [{ label: 'LinkedIn', url: '#' }],
      order: 6,
    },
  ]);
  console.log(`${teamMembers.length} team members created`);

  // ── Blog Posts ──
  const blogPosts = await BlogPost.insertMany([
    {
      title: 'The State of Fintech in Bangladesh: 2024 & Beyond',
      slug: 'fintech-bangladesh-2024',
      content: `Bangladesh's fintech sector has seen unprecedented growth in the last few years. With over 100 million mobile financial service users and a rapidly growing digital payment ecosystem, the country is poised for a fintech revolution.

Key trends shaping the industry include:
- The rise of digital banks and neobanks
- AI-powered credit scoring for unbanked populations
- Blockchain-based remittance solutions
- Open banking initiatives by Bangladesh Bank

AppIt has been at the forefront of this transformation, helping fintech startups build scalable, secure platforms that serve millions of Bangladeshis.`,
      excerpt: 'An in-depth look at Bangladesh\'s booming fintech sector and what the future holds for digital financial services.',
      tags: ['Fintech', 'Bangladesh', 'Digital Payments', 'Trends'],
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
      author: 'Arefin Karim',
      publishedAt: new Date('2025-12-15'),
      status: 'published',
    },
    {
      title: 'How We Built a Scalable E-commerce Platform for a Dhaka-based Retailer',
      slug: 'scalable-ecommerce-dhaka',
      content: `When a leading Dhaka-based retailer approached us to build their e-commerce platform, they had one core requirement: handle 10x growth without breaking a sweat.

We built the platform using a microservices architecture with:
- Next.js for the frontend
- Node.js microservices for the backend
- MongoDB and Redis for data
- AWS ECS with auto-scaling
- CloudFront CDN for fast content delivery

The platform now handles 100,000+ daily visitors and processes over 5,000 orders per day during peak seasons like Pohela Boishakh.`,
      excerpt: 'Case study on building a high-traffic e-commerce platform using microservices architecture.',
      tags: ['E-commerce', 'Case Study', 'Scalability', 'AWS'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      author: 'Farzana Rahman',
      publishedAt: new Date('2025-11-20'),
      status: 'published',
    },
    {
      title: 'Why Your Business Needs a Digital Transformation Strategy',
      slug: 'digital-transformation-bd',
      content: `Digital transformation is no longer optional for Bangladeshi businesses. With increasing internet penetration and smartphone adoption, companies must adapt or risk being left behind.

This guide covers:
1. Assessing your current digital maturity
2. Identifying key areas for automation
3. Choosing the right technology stack
4. Building a digital-first culture
5. Measuring ROI on digital initiatives

Whether you're a traditional manufacturer in Narayanganj or a startup in Gulshan, digital transformation can unlock new growth opportunities.`,
      excerpt: 'A practical guide for Bangladeshi businesses looking to embark on their digital transformation journey.',
      tags: ['Digital Transformation', 'Business Strategy', 'Bangladesh'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      author: 'Arefin Karim',
      publishedAt: new Date('2025-10-05'),
      status: 'published',
    },
    {
      title: 'Upcoming Features: What\'s Next for AppIt Platform',
      slug: 'appit-upcoming-features',
      content: `We're excited to share our product roadmap for the coming months. Here's what we're building:

- AI-powered project recommendations
- Real-time collaboration tools
- Integrated payment gateway with bKash and Nagad
- Mobile app for order tracking
- Enhanced analytics dashboard

These features will be rolled out gradually over the next quarter. Stay tuned!`,
      excerpt: 'A sneak peek at the new features and improvements coming to the AppIt platform.',
      tags: ['Product', 'Update', 'Roadmap'],
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
      author: 'Tanvir Ahmed',
      publishedAt: null,
      status: 'draft',
    },
  ]);
  console.log(`${blogPosts.length} blog posts created`);

  // ── Portfolio ──
  const portfolios = await Portfolio.insertMany([
    {
      title: 'Shikho Learning Platform',
      slug: 'shikho-learning-platform',
      description: 'A comprehensive edtech platform connecting students across Bangladesh with quality teachers and interactive learning materials. Features live classes, recorded sessions, quizzes, and progress tracking.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
      techUsed: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'AWS'],
      client: 'Shikho Technologies',
      url: 'https://shikho.com',
      impact: '50,000+ daily active students, 98% uptime, 4.5★ app rating',
      status: 'published',
    },
    {
      title: 'Chaldal Redesign',
      slug: 'chaldal-redesign',
      description: 'Complete UI/UX overhaul for Bangladesh\'s leading online grocery platform. Improved user flow, streamlined checkout, and enhanced mobile experience led to significant conversion gains.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
      techUsed: ['Figma', 'React Native', 'Tailwind CSS', 'Framer Motion'],
      client: 'Chaldal',
      url: 'https://chaldal.com',
      impact: '35% increase in conversion rate, 50% faster checkout',
      status: 'published',
    },
    {
      title: 'Sheba Platform Backend',
      slug: 'sheba-platform-backend',
      description: 'Scalable microservices backend for Bangladesh\'s largest home services platform. Handles millions of service requests across 50+ categories from Dhaka to Chattogram.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      techUsed: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
      client: 'Sheba Platform',
      url: 'https://sheba.xyz',
      impact: 'Zero-downtime migration, 3x improvement in API response time',
      status: 'published',
    },
    {
      title: 'SSL Wireless Payment Gateway',
      slug: 'ssl-wireless-gateway',
      description: 'Payment gateway integration platform connecting 15+ banks and MFS providers including bKash, Nagad, and Rocket. Built with enterprise-grade security and PCI DSS compliance.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
      techUsed: ['Java', 'Spring Boot', 'Oracle', 'Kafka', 'Docker'],
      client: 'SSL Wireless',
      impact: 'Processes ৳500Cr+ in transactions monthly',
      status: 'published',
    },
  ]);
  console.log(`${portfolios.length} portfolio projects created`);

  // ── Products ──
  const products = await Product.insertMany([
    {
      name: 'AppIt Pay',
      description: 'Unified payment gateway integration for Bangladeshi businesses. Supports bKash, Nagad, Rocket, all major bank cards, and mobile banking.',
      features: [
        'bKash, Nagad, Rocket integration',
        'All major debit & credit cards',
        'Internet banking (all BD banks)',
        'Recurring billing support',
        'Real-time transaction dashboard',
        'PCI DSS Level 1 compliant',
      ],
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
      pricing: 'Starting from ৳9,999/month + 1.5% per transaction',
      trialLink: '#',
      status: 'active',
    },
    {
      name: 'AppIt CRM',
      description: 'Customer relationship management platform built for Bangladeshi sales teams. Manage leads, track deals, and automate follow-ups.',
      features: [
        'Lead & deal management',
        'Automated email & SMS campaigns',
        'Bangla language support',
        'Integration with bKash for payments',
        'Sales analytics & forecasting',
        'Mobile app for field sales',
      ],
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
      pricing: 'Starting from ৳4,999/user/month',
      trialLink: '#',
      status: 'active',
    },
    {
      name: 'AppIt HR',
      description: 'Complete HR management solution for Bangladeshi companies. From hiring to payroll, manage your entire workforce in one place.',
      features: [
        'Employee database management',
        'Attendance & leave tracking',
        'Payroll with tax calculation (BD rules)',
        'Performance review system',
        'Recruitment & applicant tracking',
        'Compliance with Bangladesh Labour Law',
      ],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      pricing: 'Starting from ৳2,999/user/month',
      trialLink: '#',
      status: 'active',
    },
  ]);
  console.log(`${products.length} products created`);

  // ── Orders ──
  const orders = await Order.insertMany([
    {
      user: user1._id,
      service: services[0]._id,
      name: 'Kabir Hossain',
      email: 'kabir@example.com',
      companyName: 'Shikho Technologies',
      details: 'Need a full-stack e-learning platform with live class streaming, assignment submission, and payment gateway integration with bKash. Timeline: 4 months.',
      price: 2500000,
      status: 'on-going',
    },
    {
      user: user1._id,
      service: services[1]._id,
      name: 'Kabir Hossain',
      email: 'kabir@example.com',
      companyName: 'Shikho Technologies',
      details: 'UI/UX redesign of our student dashboard. Need a clean, modern interface optimized for low-bandwidth connections common in rural Bangladesh.',
      price: 800000,
      status: 'done',
    },
    {
      user: user2._id,
      service: services[2]._id,
      name: 'Nusrat Jahan',
      email: 'nusrat@example.com',
      companyName: 'Chaldal',
      details: 'Migrate our infrastructure from on-premise servers in Dhaka to AWS with Kubernetes orchestration. Must handle 10x traffic spikes during peak seasons.',
      price: 3500000,
      status: 'pending',
    },
    {
      user: user2._id,
      service: services[4]._id,
      name: 'Nusrat Jahan',
      email: 'nusrat@example.com',
      companyName: 'Chaldal',
      details: 'Full cybersecurity audit including penetration testing, vulnerability assessment, and compliance review for PCI DSS certification.',
      price: 1200000,
      status: 'pending',
    },
    {
      user: user3._id,
      service: services[3]._id,
      name: 'Tanvir Ahmed',
      email: 'tanvir@example.com',
      companyName: 'Sheba Platform',
      details: 'Build a demand forecasting model using ML to predict service demand across 64 districts. Integrate with existing booking system.',
      price: 1800000,
      status: 'on-going',
    },
    {
      user: user3._id,
      service: services[5]._id,
      name: 'Tanvir Ahmed',
      email: 'tanvir@example.com',
      companyName: 'Sheba Platform',
      details: 'Digital marketing campaign for the upcoming Pohela Boishakh promotion. Includes SEO, social media, and paid ads targeting Dhaka and Chattogram.',
      price: 500000,
      status: 'pending',
    },
  ]);
  console.log(`${orders.length} orders created`);

  // ── Invoices ──
  const invoices = await Invoice.insertMany([
    {
      user: user1._id,
      order: orders[0]._id,
      amount: 1000000,
      status: 'paid',
      dueDate: new Date('2025-08-15'),
      paidAt: new Date('2025-08-10'),
    },
    {
      user: user1._id,
      order: orders[0]._id,
      amount: 1500000,
      status: 'pending',
      dueDate: new Date('2025-12-31'),
    },
    {
      user: user1._id,
      order: orders[1]._id,
      amount: 800000,
      status: 'paid',
      dueDate: new Date('2025-06-30'),
      paidAt: new Date('2025-06-25'),
    },
    {
      user: user2._id,
      order: orders[2]._id,
      amount: 3500000,
      status: 'pending',
      dueDate: new Date('2026-03-15'),
    },
    {
      user: user3._id,
      order: orders[4]._id,
      amount: 900000,
      status: 'overdue',
      dueDate: new Date('2025-09-01'),
    },
  ]);
  console.log(`${invoices.length} invoices created`);

  // ── Support Tickets ──
  const tickets = await Ticket.insertMany([
    {
      user: user1._id,
      subject: 'Cannot access my project dashboard',
      message: 'Hi, I\'m unable to see my project progress on the dashboard. It shows a blank page every time I try to load it. Please help.',
      replies: [
        {
          user: admin._id,
          message: 'Hi Kabir, thank you for reaching out. Our team has identified the issue — it was a caching problem. Could you please try clearing your browser cache and logging in again?',
          createdAt: new Date('2025-12-10T06:30:00Z'),
        },
        {
          user: user1._id,
          message: 'That worked! I can see my dashboard now. Thank you for the quick support.',
          createdAt: new Date('2025-12-10T07:00:00Z'),
        },
      ],
      status: 'resolved',
      priority: 'high',
    },
    {
      user: user2._id,
      subject: 'Invoice payment not reflecting',
      message: 'I paid invoice INV-002 via bKash yesterday but it still shows as pending. Transaction ID: BK1234567890.',
      replies: [
        {
          user: admin._id,
          message: 'Hi Nusrat, I\'ve checked with our finance team. The bKash payment was received but there was a sync delay. I\'ve updated your invoice status to paid now. Apologies for the inconvenience.',
          createdAt: new Date('2025-12-12T09:15:00Z'),
        },
        {
          user: user2._id,
          message: 'Thank you! I can see it\'s updated now. Appreciate the quick response.',
          createdAt: new Date('2025-12-12T09:45:00Z'),
        },
      ],
      status: 'resolved',
      priority: 'high',
    },
    {
      user: user3._id,
      subject: 'Feature request: Bangla language support',
      message: 'Hi team, would it be possible to add Bangla language support to the client dashboard? Many of my team members are more comfortable working in Bangla.',
      replies: [],
      status: 'open',
      priority: 'medium',
    },
    {
      user: user1._id,
      subject: 'Need to add another admin user',
      message: 'I need to add my colleague to the project so they can track progress too. Can you help set that up?',
      replies: [],
      status: 'in-progress',
      priority: 'low',
    },
  ]);
  console.log(`${tickets.length} tickets created`);

  // ── Contact Requests ──
  const contactRequests = await ContactRequest.insertMany([
    {
      name: 'Mizanur Rahman',
      email: 'mizan@bdtraders.com',
      phone: '+8801712345678',
      subject: 'Partnership Inquiry',
      message: 'We are a manufacturing company in Narayanganj looking to digitize our operations. Interested in discussing your digital transformation services.',
      status: 'unread',
    },
    {
      name: 'Fatima Begum',
      email: 'fatima@techventures.bd',
      phone: '+8801812345678',
      subject: 'Startup Package',
      message: 'We are a seed-stage startup in Dhaka building a healthtech platform. Would like to learn more about your startup packages and pricing.',
      status: 'read',
    },
    {
      name: 'Hasan Ali',
      email: 'hasan@schools.edu.bd',
      subject: 'School Management System',
      message: 'We are a school in Sylhet looking for a custom school management system. Need attendance tracking, grade management, and parent communication features.',
      status: 'replied',
    },
  ]);
  console.log(`${contactRequests.length} contact requests created`);

  // ── Jobs ──
  const jobs = await Job.insertMany([
    {
      title: 'Senior React Developer',
      type: 'full-time',
      location: 'Dhaka, Bangladesh (Hybrid)',
      description: 'We are looking for an experienced React developer to join our growing team. You will work on building cutting-edge web applications for our clients across Bangladesh and globally.',
      requirements: [
        '3+ years of experience with React.js',
        'Strong understanding of TypeScript',
        'Experience with Next.js is a plus',
        'Familiarity with Tailwind CSS',
        'Knowledge of state management (Zustand, Redux)',
        'Experience with RESTful APIs',
      ],
      deadline: new Date('2026-03-31'),
      status: 'open',
    },
    {
      title: 'Node.js Backend Developer',
      type: 'full-time',
      location: 'Dhaka, Bangladesh (On-site)',
      description: 'Join our backend team to design and build scalable APIs and microservices powering our platform and client projects.',
      requirements: [
        '3+ years of experience with Node.js',
        'Strong experience with MongoDB and PostgreSQL',
        'Knowledge of microservices architecture',
        'Experience with Docker and Kubernetes',
        'Understanding of message queues (RabbitMQ, Kafka)',
        'Familiarity with cloud services (AWS/GCP)',
      ],
      deadline: new Date('2026-04-15'),
      status: 'open',
    },
    {
      title: 'UI/UX Design Intern',
      type: 'internship',
      location: 'Dhaka, Bangladesh',
      description: 'A 3-month paid internship for aspiring UI/UX designers. Work alongside our senior designers on real client projects and build your portfolio.',
      requirements: [
        'Currently pursuing or recently graduated in Design or related field',
        'Proficiency in Figma',
        'Understanding of design principles',
        'Knowledge of design systems',
        'Portfolio showcasing your work',
      ],
      deadline: new Date('2026-02-28'),
      status: 'open',
    },
    {
      title: 'DevOps Engineer',
      type: 'contract',
      location: 'Remote (Bangladesh-based)',
      description: 'We need a skilled DevOps engineer for a 6-month contract to help with our cloud infrastructure migration and CI/CD pipeline setup.',
      requirements: [
        '5+ years of DevOps experience',
        'Expert knowledge of AWS services',
        'Experience with Terraform and Ansible',
        'Strong knowledge of CI/CD (GitHub Actions, Jenkins)',
        'Experience with monitoring tools (Prometheus, Grafana)',
        'Knowledge of security best practices',
      ],
      deadline: new Date('2026-03-01'),
      status: 'open',
    },
    {
      title: 'Digital Marketing Specialist',
      type: 'full-time',
      location: 'Dhaka, Bangladesh',
      description: 'Lead our digital marketing efforts targeting the Bangladeshi market. Manage campaigns across Google, Facebook, and local platforms.',
      requirements: [
        '2+ years of digital marketing experience',
        'Experience with Google Ads and Meta Ads',
        'Knowledge of SEO best practices',
        'Experience with analytics tools',
        'Understanding of the Bangladeshi digital landscape',
        'Bengali and English proficiency',
      ],
      deadline: new Date('2026-03-15'),
      status: 'closed',
    },
  ]);
  console.log(`${jobs.length} jobs created`);

  // ── Job Applications ──
  const applications = await JobApplication.insertMany([
    {
      job: jobs[0]._id,
      name: 'Sabbir Hossain',
      email: 'sabbir.dev@gmail.com',
      phone: '+8801700000001',
      resumeFile: '/uploads/resumes/sabbir-resume.pdf',
      coverLetter: 'I am a React developer with 4 years of experience building web applications for Bangladeshi startups. I have worked with companies like Pathao and Sheba. I am excited about the opportunity to join AppIt and contribute to impactful projects.',
      status: 'shortlisted',
    },
    {
      job: jobs[0]._id,
      name: 'Marjia Sultana',
      email: 'marjia.frontend@outlook.com',
      phone: '+8801700000002',
      coverLetter: 'I recently completed my BSc in CSE from BUET and have been working with React and TypeScript for the past 2 years. I am looking for a challenging role where I can grow and learn from experienced developers.',
      status: 'pending',
    },
    {
      job: jobs[2]._id,
      name: 'Nafis Ahmed',
      email: 'nafis.design@gmail.com',
      phone: '+8801700000003',
      coverLetter: 'I am a self-taught UI/UX designer with a strong portfolio of mobile app designs. I have completed Google\'s UX Design Certificate and am looking for an internship to gain industry experience.',
      status: 'reviewed',
    },
  ]);
  console.log(`${applications.length} job applications created`);

  // ── Disconnect ──
  await mongoose.disconnect();
  console.log('');
  console.log('========================================');
  console.log('  Seed completed successfully!');
  console.log('========================================');
  console.log('  Admin: admin@appit.com / admin123');
  console.log('  Users: kabir@example.com / user123');
  console.log('         nusrat@example.com / user123');
  console.log('         tanvir@example.com / user123');
  console.log('========================================');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
