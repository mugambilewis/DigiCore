const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { pool } = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS config – required for frontend-backend communication with cookies
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

// Serve receipt files
app.use('/receipts', express.static(path.join(__dirname, 'receipts')));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('DigiCore Backend is Running ✅');
});

// Test database connection and start server
pool.query('SELECT NOW()')
  .then(() => {
    console.log('✅ PostgreSQL (Supabase) Connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ PostgreSQL connection failed:', err);
    process.exit(1);
  });
