const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // <-- Add this
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Import your routes
const authRoutes = require('./auth/routes/authroutes');
app.use('/api/auth', authRoutes);

console.log("🔗 Auth routes mounted at /api/auth");
console.log(`🌐 Frontend URL: http://localhost:5173`);

// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sgp3';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });