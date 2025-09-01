const express = require('express');
const router = express.Router();
const { 
  getConversations, 
  getMessages, 
  sendMessage, 
  getContacts 
} = require('../controllers/messageController');
const authMiddleware = require('../auth/middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Get all conversations for the authenticated user
router.get('/conversations', getConversations);

// Get messages for a specific conversation
router.get('/conversations/:conversationId', getMessages);

// Send a new message
router.post('/send', sendMessage);

// Get contacts for new conversation
router.get('/contacts', getContacts);

module.exports = router;
