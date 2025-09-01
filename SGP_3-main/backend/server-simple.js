// server-simple.js - Simplified version without MongoDB

const express = require('express');
const cors = require('cors');
const app = express(); // <-- Move this up!
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

app.get('/test', (req, res) => {
  res.send('✅ Test route works');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Simple auth routes for testing
app.post('/api/auth/register', (req, res) => {
  console.log('Registration attempt:', req.body);
  res.status(201).json({ 
    message: 'User registered successfully (test mode)',
    token: 'test-token-123',
    user: {
      id: 'test-user-id',
      username: req.body.username,
      email: req.body.email
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  console.log('Login attempt:', req.body);
  res.status(200).json({ 
    message: 'Login successful (test mode)',
    token: 'test-token-123',
    user: {
      id: 'test-user-id',
      username: req.body.username,
      email: req.body.email || 'test@example.com'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Simple server running on http://localhost:${PORT}`);
  console.log("🔗 Test routes:");
  console.log("  - GET  /");
  console.log("  - GET  /test");
  console.log("  - GET  /health");
  console.log("  - POST /api/auth/register");
  console.log("  - POST /api/auth/login");
});