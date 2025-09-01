const Message = require('../models/message');
const { User, Company, Employee } = require('../auth/models/user');

// Get all conversations for a user
const getConversations = async (req, res) => {
  try {
    const { id: userId, type: userType } = req.user;
    
    // Get all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    }).populate('sender', 'name email companyName contactEmail firstName lastName').populate('receiver', 'name email companyName contactEmail firstName lastName');

    // Group messages by conversation
    const conversations = {};
    messages.forEach(message => {
      const conversationId = message.conversationId;
      if (!conversations[conversationId]) {
        conversations[conversationId] = {
          conversationId,
          lastMessage: message,
          unreadCount: 0
        };
      }
      
      // Update last message if this one is newer
      if (!conversations[conversationId].lastMessage || 
          message.createdAt > conversations[conversationId].lastMessage.createdAt) {
        conversations[conversationId].lastMessage = message;
      }
      
      // Count unread messages
      if (!message.isRead && message.receiver._id.toString() === userId) {
        conversations[conversationId].unreadCount++;
      }
    });

    // Convert to array and sort by last message time
    const conversationsArray = Object.values(conversations).sort((a, b) => 
      new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
    );

    res.json(conversationsArray);
  } catch (error) {
    console.error('Error getting conversations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get messages for a specific conversation
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { id: userId } = req.user;

    // Verify user is part of this conversation
    const message = await Message.findOne({
      conversationId,
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    });

    if (!message) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Get all messages for this conversation
    const messages = await Message.find({ conversationId })
      .populate('sender', 'name email companyName contactEmail firstName lastName')
      .populate('receiver', 'name email companyName contactEmail firstName lastName')
      .sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      { 
        conversationId, 
        receiver: userId, 
        isRead: false 
      },
      { isRead: true }
    );

    res.json(messages);
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, messageType = 'text' } = req.body;
    const { id: userId, type: userType } = req.user;

    // Validate receiver exists
    let receiver;
    if (userType === 'company') {
      receiver = await Employee.findById(receiverId);
    } else if (userType === 'employee') {
      receiver = await Company.findById(receiverId);
    } else {
      // For regular users, try to find in both Employee and Company collections
      receiver = await Employee.findById(receiverId) || await Company.findById(receiverId);
    }

    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Generate conversation ID
    const conversationId = Message.generateConversationId(userId, receiverId);

    // Create new message
    const message = new Message({
      sender: userId,
      senderModel: userType === 'company' ? 'Company' : (userType === 'employee' ? 'Employee' : 'User'),
      receiver: receiverId,
      receiverModel: userType === 'company' ? 'Employee' : (userType === 'employee' ? 'Company' : 'User'),
      content,
      messageType,
      conversationId
    });

    await message.save();

    // Populate sender and receiver details
    await message.populate('sender', 'name email companyName contactEmail firstName lastName');
    await message.populate('receiver', 'name email companyName contactEmail firstName lastName');

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get users/companies for new conversation
const getContacts = async (req, res) => {
  try {
    const { type: userType } = req.user;

    let contacts;
    if (userType === 'company') {
      // Companies can message employees
      contacts = await Employee.find({}, 'firstName lastName email');
    } else if (userType === 'employee') {
      // Employees can message companies
      contacts = await Company.find({}, 'companyName contactEmail');
    } else {
      // Regular users can message both companies and employees
      const employees = await Employee.find({}, 'firstName lastName email');
      const companies = await Company.find({}, 'companyName contactEmail');
      contacts = [...employees, ...companies];
    }

    res.json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getConversations,
  getMessages,
  sendMessage,
  getContacts
};
