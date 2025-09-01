# In-Platform Messaging Feature

## Overview
The in-platform messaging feature enables direct communication between companies and employees within the SGP platform. This feature provides real-time messaging capabilities with a modern, responsive interface.

## Features

### Core Functionality
- **Real-time Messaging**: Instant message delivery using Socket.IO
- **Conversation Management**: Organize messages by conversations
- **Unread Message Tracking**: Visual indicators for unread messages
- **Contact Management**: Easy access to available contacts
- **Responsive Design**: Works on desktop and mobile devices

### User Interface
- **Conversation List**: View all active conversations
- **Chat Window**: Full-featured messaging interface
- **New Conversation Modal**: Start conversations with contacts
- **Floating Notification**: Global unread message indicator
- **Mobile Responsive**: Optimized for mobile devices

## Technical Implementation

### Backend Components

#### Models
- `Message` model with conversation tracking
- Support for different message types (text, file, image)
- Automatic conversation ID generation

#### Controllers
- `getConversations`: Fetch user's conversations
- `getMessages`: Retrieve messages for a conversation
- `sendMessage`: Send new messages
- `getContacts`: Get available contacts

#### Routes
- `/api/messages/conversations` - Get conversations
- `/api/messages/conversations/:id` - Get messages
- `/api/messages/send` - Send message
- `/api/messages/contacts` - Get contacts

#### Socket.IO Integration
- Real-time message delivery
- User presence tracking
- Automatic reconnection handling

### Frontend Components

#### Context
- `MessagingContext`: Global state management
- Socket connection management
- Message synchronization

#### Components
- `MessagingInterface`: Main messaging interface
- `ConversationList`: Display conversations
- `ChatWindow`: Message display and input
- `NewConversation`: Start new conversations
- `MessagingWidget`: Embedded messaging widget
- `MessagingNotification`: Unread message indicator

## Usage

### For Companies
1. Navigate to Company Dashboard
2. Click "Messages" button in header
3. View conversations with employees
4. Start new conversations with available employees

### For Employees
1. Navigate to Employee Dashboard
2. Click "Messages" button in header
3. View conversations with companies
4. Start new conversations with available companies

### Global Access
- Floating notification appears when unread messages exist
- Click notification to access messaging interface
- Direct navigation to `/messages` route

## Installation

### Backend Dependencies
```bash
cd backend
npm install socket.io
```

### Frontend Dependencies
```bash
cd frontend
npm install socket.io-client react-icons
```

## Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `MONGO_URI`: MongoDB connection string

### Socket.IO Configuration
- CORS enabled for frontend domains
- Authentication via JWT tokens
- Automatic reconnection

## Security Features
- JWT token authentication
- User authorization for conversations
- Input validation and sanitization
- Rate limiting (recommended for production)

## Future Enhancements
- File and image sharing
- Message encryption
- Typing indicators
- Message reactions
- Conversation search
- Message threading
- Push notifications

## Troubleshooting

### Common Issues
1. **Socket connection fails**: Check server status and CORS configuration
2. **Messages not appearing**: Verify authentication token
3. **Real-time updates not working**: Check Socket.IO connection

### Debug Mode
Enable debug logging in the messaging context for detailed connection information.

## API Documentation

### Authentication
All messaging endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Endpoints

#### GET /api/messages/conversations
Returns user's conversations with unread counts.

#### GET /api/messages/conversations/:conversationId
Returns messages for a specific conversation.

#### POST /api/messages/send
Send a new message.
```json
{
  "receiverId": "user_id",
  "content": "Message content",
  "messageType": "text"
}
```

#### GET /api/messages/contacts
Returns available contacts for new conversations.
