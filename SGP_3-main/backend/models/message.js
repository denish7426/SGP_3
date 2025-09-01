const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel',
    required: true
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['User', 'Company', 'Employee']
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'receiverModel',
    required: true
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ['User', 'Company', 'Employee']
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  messageType: {
    type: String,
    enum: ['text', 'file', 'image'],
    default: 'text'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  conversationId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create a compound index for efficient querying
messageSchema.index({ conversationId: 1, createdAt: -1 });

// Static method to generate conversation ID
messageSchema.statics.generateConversationId = function(senderId, receiverId) {
  const sortedIds = [senderId.toString(), receiverId.toString()].sort();
  return `${sortedIds[0]}_${sortedIds[1]}`;
};

module.exports = mongoose.model('Message', messageSchema);
