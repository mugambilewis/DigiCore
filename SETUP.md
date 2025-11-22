# DigiCore PERN Ecommerce Platform - Setup Guide

## Overview
DigiCore has been converted from MERN (MongoDB) to PERN (PostgreSQL) using Supabase as the database provider.

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account (free tier works)
- Email service credentials (for OTP and receipts - Gmail, SendGrid, etc.)

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Supabase Database

1. Create a new project in Supabase (https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run the SQL schema from `backend/config/schema.sql` to create all tables
4. Copy your Supabase connection string from Settings > Database > Connection string (URI format)

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database (Supabase PostgreSQL)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Service (for OTP and receipts)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Note:** For Gmail, you need to:
- Enable 2-factor authentication
- Generate an App Password (not your regular password)
- Use the App Password in `SMTP_PASS`

### 4. Create Receipts Directory
```bash
mkdir backend/receipts
```

### 5. Start Backend Server
```bash
npm run dev
```

The server should start on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

The frontend should start on `http://localhost:5173`

## Database Schema

The following tables are created:
- **users**: Stores user accounts (name, email, password, is_admin)
- **orders**: Stores order information (user_id, totals, receipt_link, status)
- **order_items**: Stores individual items in each order
- **password_resets**: Stores OTP codes for password reset

## Features Implemented

### Authentication
- ✅ User registration with email/password
- ✅ User login with HTTP-only cookies
- ✅ Password reset with OTP sent via email
- ✅ Get current user endpoint

### Orders
- ✅ Create orders with cart items
- ✅ Automatic receipt generation (PDF)
- ✅ Receipt download links stored in database
- ✅ Order history for users
- ✅ Currency conversion (USDT to KES)

### User Dashboard
- ✅ View order history
- ✅ Download receipts
- ✅ View profile information
- ✅ Account settings

### Admin Dashboard
- ✅ View all users
- ✅ View all orders
- ✅ Sales statistics (total orders, revenue, average order value)
- ✅ User count

### Checkout
- ✅ Multi-step checkout process
- ✅ Shipping information collection
- ✅ Mock payment flow (no real payment gateway)
- ✅ Automatic order creation and receipt generation

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/password-reset/request` - Request password reset OTP
- `POST /api/auth/password-reset/verify` - Verify OTP
- `POST /api/auth/password-reset/update` - Update password with OTP

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get single order (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)
- `GET /api/admin/stats` - Get sales statistics (admin only)

## Creating an Admin User

To create an admin user, you can either:

1. **Via Supabase SQL Editor:**
```sql
UPDATE users SET is_admin = true WHERE email = 'admin@example.com';
```

2. **Via Database directly:**
   - Connect to your Supabase database
   - Update the `is_admin` field to `true` for the desired user

## Currency Conversion

The system automatically converts USDT prices to Kenya Shilling (KES) at checkout. The conversion rate is set in `backend/utils/currencyConverter.js` (default: 1 USDT = 150.5 KES).

## Receipt Generation

Receipts are automatically generated as PDF files when an order is placed. They are stored in the `backend/receipts` directory and served statically at `/receipts/[filename]`.

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Check that your Supabase project is active
- Ensure the SQL schema has been run

### Email Not Sending
- Verify SMTP credentials are correct
- For Gmail, ensure you're using an App Password, not your regular password
- Check that 2FA is enabled on your Gmail account

### Receipt Generation Fails
- Ensure the `backend/receipts` directory exists
- Check file permissions
- Verify PDFKit is installed

### CORS Issues
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that `credentials: true` is set in CORS config

## Next Steps

1. Set up your Supabase database
2. Configure environment variables
3. Run the SQL schema
4. Start both backend and frontend servers
5. Create an admin user via database
6. Test the application!

## Support

For issues or questions, check the code comments or refer to the implementation files.

