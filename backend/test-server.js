const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));

// Test routes
app.get('/', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

app.get('/test', (req, res) => {
  res.send('✅ Test route works');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log('Try visiting: http://localhost:3000/test');
}); 