const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Root route for basic server info
app.get('/', (req, res) => {
  res.json({
    message: 'SGP Backend API Server',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      messages: '/api/messages'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Import your routes
const authRoutes = require('./auth/routes/authroutes');
<<<<<<< HEAD
const messageRoutes = require('./routes/messageRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

console.log("🔗 Auth routes mounted at /api/auth");
console.log("💬 Message routes mounted at /api/messages");
=======
const adminRoutes = require('./auth/routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

console.log("🔗 Auth routes mounted at /api/auth");
console.log("🔗 Admin routes mounted at /api/admin");
>>>>>>> c9e738aed44d71ac6a96457f40761632120ab4a3
console.log(`🌐 Frontend URL: http://localhost:5173`);

// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sgp3';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    
    // Socket.IO connection handling
    io.on('connection', (socket) => {
      console.log('🔌 User connected:', socket.id);
      
      // Join user to their personal room
      socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`👤 User ${userId} joined their room`);
      });
      
      // Handle new message
      socket.on('send_message', (data) => {
        // Broadcast to receiver
        socket.to(data.receiverId).emit('receive_message', data);
        console.log(`📨 Message sent from ${data.senderId} to ${data.receiverId}`);
      });
      
      socket.on('disconnect', () => {
        console.log('🔌 User disconnected:', socket.id);
      });
    });
    
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🔌 Socket.IO server ready`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });