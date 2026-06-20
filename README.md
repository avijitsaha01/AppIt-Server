# AppIt Server

Backend API for [AppIt](https://itclient.vercel.app) — a full-featured creative agency management platform. Built with **Express 5**, **TypeScript**, **Mongoose 8**, **JWT authentication**, and **Zod validation**.

**Live API:** https://appit-server.onrender.com

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express 5** | HTTP framework |
| **TypeScript** | Type safety |
| **MongoDB Atlas + Mongoose 8** | Database & ODM |
| **JWT (jsonwebtoken)** | Authentication |
| **bcryptjs** | Password hashing |
| **Zod** | Request validation |
| **Multer** | File uploads (local filesystem) |
| **tsup** | Build bundler (ESM output) |
| **tsx** | Dev runner with hot reload |

## Features

- **JWT Authentication** — Register, login, protected routes, role-based access
- **Role-based Access** — Customer and admin roles with middleware guards
- **Full Admin Panel API** — Manage services, orders, team, blog, portfolio, products, jobs, tickets, invoices, and more
- **Order Management** — Place orders with file upload, track status (pending / on-going / done)
- **Service CRUD** — Admin-managed service catalog
- **Team Management** — Team member profiles with images and social links
- **Blog System** — Published/draft posts with markdown content, tags, featured images
- **Portfolio / Case Studies** — Project gallery with tech stack, client info, business impact
- **Product Catalog** — Product listings with features, pricing, trial links
- **Job Board** — Job openings with type, location, requirements, application form
- **Job Applications** — Resume upload, status tracking (pending / reviewed / shortlisted / rejected)
- **Contact/Lead Management** — Contact form submissions with status tracking
- **Support Tickets** — Customer support tickets with threaded replies, priority, status
- **Invoices** — Invoice generation linked to orders with payment status
- **Partner Management** — Partner logo management
- **Slider Management** — Homepage carousel slides
- **Reviews** — Customer feedback with ratings
- **File Uploads** — Image uploads stored locally in `uploads/`
- **Request Validation** — Zod schemas for all inputs
- **Global Error Handling** — Consistent JSON error responses
- **FormData Normalization** — Array field support for multipart uploads

## API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/me` | Yes | Get current user profile |

### Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | Yes | Place order (multipart with image) |
| GET | `/api/orders/my` | Yes | Get current user's orders |
| GET | `/api/orders` | Admin | Get all orders |
| PATCH | `/api/orders/:id/status` | Admin | Update order status |

### Services

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/services` | No | List all services |
| POST | `/api/services` | Admin | Add service (multipart with image) |
| PUT | `/api/services/:id` | Admin | Update service |
| DELETE | `/api/services/:id` | Admin | Delete service |

### Partners

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/partners` | No | List all partners |
| POST | `/api/partners` | Admin | Add partner (multipart with logo) |
| DELETE | `/api/partners/:id` | Admin | Delete partner |

### Sliders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/sliders` | No | List all sliders |
| POST | `/api/sliders` | Admin | Add slider (multipart with image) |
| DELETE | `/api/sliders/:id` | Admin | Delete slider |

### Reviews

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/reviews` | No | List all reviews |
| POST | `/api/reviews` | Yes | Add review (multipart with image) |

### Team Members

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/team-members` | No | List all team members |
| POST | `/api/team-members` | Admin | Add team member (multipart with image) |
| PUT | `/api/team-members/:id` | Admin | Update team member |
| DELETE | `/api/team-members/:id` | Admin | Delete team member |

### Blog Posts

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/blog-posts/published` | No | List published blog posts |
| GET | `/api/blog-posts/slug/:slug` | No | Get single published post by slug |
| GET | `/api/blog-posts` | Admin | List all posts (including drafts) |
| POST | `/api/blog-posts` | Admin | Create blog post (multipart with image) |
| PUT | `/api/blog-posts/:id` | Admin | Update blog post |
| DELETE | `/api/blog-posts/:id` | Admin | Delete blog post |

### Jobs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/jobs/open` | No | List open job positions |
| GET | `/api/jobs` | Admin | List all jobs |
| POST | `/api/jobs` | Admin | Create job opening |
| PUT | `/api/jobs/:id` | Admin | Update job |
| DELETE | `/api/jobs/:id` | Admin | Delete job |

### Job Applications

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/job-applications` | No | Submit application (multipart with resume) |
| GET | `/api/job-applications` | Admin | List all applications |
| PUT | `/api/job-applications/:id` | Admin | Update application status |
| DELETE | `/api/job-applications/:id` | Admin | Delete application |

### Contact Requests

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact-requests` | No | Submit contact form |
| GET | `/api/contact-requests` | Admin | List all contact requests |
| PUT | `/api/contact-requests/:id` | Admin | Update request status |
| DELETE | `/api/contact-requests/:id` | Admin | Delete request |

### Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products/active` | No | List active products |
| GET | `/api/products` | Admin | List all products |
| POST | `/api/products` | Admin | Add product (multipart with image) |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

### Portfolio

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/portfolios/published` | No | List published portfolio projects |
| GET | `/api/portfolios` | Admin | List all projects |
| POST | `/api/portfolios` | Admin | Create project (multipart with image) |
| PUT | `/api/portfolios/:id` | Admin | Update project |
| DELETE | `/api/portfolios/:id` | Admin | Delete project |

### Tickets

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/tickets` | Yes | Get current user's tickets |
| GET | `/api/tickets/all` | Admin | Get all tickets |
| GET | `/api/tickets/:id` | Yes | Get single ticket (owner or admin) |
| POST | `/api/tickets` | Yes | Create new ticket |
| POST | `/api/tickets/:id/reply` | Yes | Add reply to ticket |
| PUT | `/api/tickets/:id` | Admin | Update ticket status/priority |
| DELETE | `/api/tickets/:id` | Admin | Delete ticket |

### Invoices

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/invoices` | Yes | Get current user's invoices |
| GET | `/api/invoices/all` | Admin | Get all invoices |
| POST | `/api/invoices` | Admin | Create invoice |
| PUT | `/api/invoices/:id` | Admin | Update invoice status |
| DELETE | `/api/invoices/:id` | Admin | Delete invoice |

### Admin

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/admin/make-admin` | Admin | Promote user to admin |
| POST | `/api/admin/remove-admin` | Admin | Demote admin to customer |
| GET | `/api/admin/users` | Admin | List all users |

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance (local or Atlas)

### Installation

```bash
git clone https://github.com/avijitsaha01/AppIt-Server.git
cd AppIt-Server
npm install
cp .env.example .env
```

### Configuration

Edit `.env` with your values:

```env
PORT=8080
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.xxxxx.mongodb.net/appIT
JWT_SECRET=your-long-random-secret-here
JWT_EXPIRES_IN=7d
UPLOAD_DIR=uploads
CLIENT_URL=https://itclient.vercel.app
```

### Seed Database

```bash
npx tsx src/seed.ts
```

Default credentials:
- **Admin:** `admin@appit.com` / `admin123`
- **Customer:** `john@example.com` / `user123`

### Running

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Start production
npm start
```

## Project Structure

```
src/
├── config/
│   ├── db.ts                 # Mongoose connection
│   └── env.ts                # Zod-validated env config
├── controllers/              # Request handlers (15 controllers)
│   ├── admin.controller.ts
│   ├── auth.controller.ts
│   ├── blog-post.controller.ts
│   ├── contact-request.controller.ts
│   ├── invoice.controller.ts
│   ├── job-application.controller.ts
│   ├── job.controller.ts
│   ├── order.controller.ts
│   ├── partner.controller.ts
│   ├── portfolio.controller.ts
│   ├── product.controller.ts
│   ├── review.controller.ts
│   ├── service.controller.ts
│   ├── slider.controller.ts
│   ├── team-member.controller.ts
│   └── ticket.controller.ts
├── middleware/
│   ├── admin.ts              # Admin role guard
│   ├── auth.ts               # JWT authentication
│   ├── error.ts              # Global error handler
│   └── upload.ts             # Multer file upload
├── models/                   # Mongoose schemas (15 models)
│   ├── blog-post.model.ts
│   ├── contact-request.model.ts
│   ├── invoice.model.ts
│   ├── job-application.model.ts
│   ├── job.model.ts
│   ├── order.model.ts
│   ├── partner.model.ts
│   ├── portfolio.model.ts
│   ├── product.model.ts
│   ├── review.model.ts
│   ├── service.model.ts
│   ├── slider.model.ts
│   ├── team-member.model.ts
│   ├── ticket.model.ts
│   └── user.model.ts
├── routes/                   # Route definitions (16 route files)
│   ├── admin.routes.ts
│   ├── auth.routes.ts
│   ├── blog-post.routes.ts
│   ├── contact-request.routes.ts
│   ├── index.ts              # Route aggregator
│   ├── invoice.routes.ts
│   ├── job-application.routes.ts
│   ├── job.routes.ts
│   ├── order.routes.ts
│   ├── partner.routes.ts
│   ├── portfolio.routes.ts
│   ├── product.routes.ts
│   ├── review.routes.ts
│   ├── service.routes.ts
│   ├── slider.routes.ts
│   ├── team-member.routes.ts
│   └── ticket.routes.ts
├── utils/
│   ├── api-error.ts          # Custom error classes
│   ├── jwt.ts                # JWT sign/verify
│   ├── normalize-form.ts     # FormData array field normalization
│   └── password.ts           # bcrypt hash/compare
├── validators/               # Zod validation schemas (12 validators)
│   ├── auth.validator.ts
│   ├── blog-post.validator.ts
│   ├── contact-request.validator.ts
│   ├── invoice.validator.ts
│   ├── job-application.validator.ts
│   ├── job.validator.ts
│   ├── order.validator.ts
│   ├── portfolio.validator.ts
│   ├── product.validator.ts
│   ├── review.validator.ts
│   ├── service.validator.ts
│   ├── team-member.validator.ts
│   └── ticket.validator.ts
├── seed.ts                   # Database seed script
└── index.ts                  # Entry point
```

## Database Collections

| Collection | Description |
|------------|-------------|
| `users` | User accounts with email, password (hashed), role (customer/admin) |
| `orders` | Service orders with status tracking and file attachments |
| `services` | IT services catalog |
| `partners` | Partner company logos |
| `sliders` | Homepage carousel slides |
| `reviews` | Customer reviews with ratings |
| `teammembers` | Team member profiles |
| `blogposts` | Blog articles with markdown content |
| `jobs` | Job openings |
| `jobapplications` | Candidate applications with resumes |
| `contactrequests` | Contact form submissions |
| `products` | Software product catalog |
| `portfolios` | Case study / project gallery |
| `tickets` | Support tickets with reply threads |
| `invoices` | Order invoices with payment status |

## Error Handling

All errors return a consistent JSON structure:

```json
{ "error": "Error message here" }
```

Validation errors include field-level details:

```json
{
  "error": "Validation error",
  "details": [
    { "path": "email", "message": "Invalid email" }
  ]
}
```

## Deployment

### Render

1. Push to GitHub
2. On Render, create a new **Web Service**
3. Connect your repo
4. Set build command: `npm run build`
5. Set start command: `npm start`
6. Add environment variables in Render dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL` = `https://itclient.vercel.app`
