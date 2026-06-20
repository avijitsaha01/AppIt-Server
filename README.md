# AppIt Server

Backend API for AppIt — a creative agency management platform. Built with **Express 5**, **TypeScript**, **Mongoose**, and **JWT authentication**.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express 5** | HTTP framework |
| **TypeScript** | Type safety |
| **MongoDB + Mongoose 8** | Database & ODM |
| **JWT (jsonwebtoken)** | Authentication |
| **bcryptjs** | Password hashing |
| **Zod** | Request validation |
| **Multer** | File uploads (local storage) |
| **tsup** | Build bundler |
| **tsx** | Dev runner |

## Features

- **JWT Authentication** — Register, login, and protected routes
- **Role-based Access** — Customer and admin roles with middleware guards
- **Order Management** — Place orders with file upload, track status
- **Service CRUD** — Admin-managed service catalog
- **Partner Management** — Partner logo management
- **Slider Management** — Homepage carousel slides
- **Reviews** — Customer feedback with ratings
- **File Uploads** — Image uploads stored locally in `uploads/`
- **Request Validation** — Zod schemas for all inputs
- **Global Error Handling** — Consistent error responses

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
# Clone the repository
git clone https://github.com/avijitsaha01/AppIt-Server.git
cd AppIt-Server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Configuration

Edit `.env` with your values:

```env
PORT=8080
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.xxxxx.mongodb.net/appit
JWT_SECRET=your-long-random-secret-here
JWT_EXPIRES_IN=7d
UPLOAD_DIR=uploads
```

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
│   ├── db.ts              # Mongoose connection
│   └── env.ts             # Zod-validated env config
├── controllers/           # Request handlers
│   ├── admin.controller.ts
│   ├── auth.controller.ts
│   ├── order.controller.ts
│   ├── partner.controller.ts
│   ├── review.controller.ts
│   ├── service.controller.ts
│   └── slider.controller.ts
├── middleware/
│   ├── admin.ts           # Admin role guard
│   ├── auth.ts            # JWT authentication
│   ├── error.ts           # Global error handler
│   └── upload.ts          # Multer file upload
├── models/                # Mongoose schemas
│   ├── order.model.ts
│   ├── partner.model.ts
│   ├── review.model.ts
│   ├── service.model.ts
│   ├── slider.model.ts
│   └── user.model.ts
├── routes/
│   ├── admin.routes.ts
│   ├── auth.routes.ts
│   ├── index.ts           # Route aggregator
│   ├── order.routes.ts
│   ├── partner.routes.ts
│   ├── review.routes.ts
│   ├── service.routes.ts
│   └── slider.routes.ts
├── utils/
│   ├── api-error.ts       # Custom error classes
│   ├── jwt.ts             # JWT sign/verify
│   └── password.ts        # bcrypt hash/compare
├── validators/            # Zod validation schemas
│   ├── auth.validator.ts
│   ├── order.validator.ts
│   ├── review.validator.ts
│   └── service.validator.ts
└── index.ts               # Entry point
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

## Error Handling

All errors return a consistent JSON structure:

```json
{
  "error": "Error message here"
}
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

## Migrating from v1

This is a complete rewrite. Key changes:
- **JavaScript → TypeScript** with strict mode
- **Single file → Modular structure** (controllers, models, routes, middleware)
- **MongoDB native driver → Mongoose** with schema validation
- **Base64 images → Local file system** via Multer
- **No auth → JWT auth** with register/login endpoints
- **`admins` collection → `users.role` field** for role management
- **Frontend-only Firebase auth → Backend-verified JWT auth**
