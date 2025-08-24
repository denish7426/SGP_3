import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const MessagingContext = createContext();

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};

export const MessagingProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Initialize socket connection
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const newSocket = io('http://localhost:3000', {
        auth: {
          token
        }
      });

      newSocket.on('connect', () => {
        console.log('Connected to messaging server');
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            const user = JSON.parse(userData);
            const userId = user.id;
            if (userId) {
              newSocket.emit('join', userId);
              console.log('User joined room:', userId);
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      newSocket.on('receive_message', (message) => {
        // Add new message to current conversation if it matches
        if (currentConversation && 
            message.conversationId === currentConversation.conversationId) {
          setMessages(prev => [...prev, message]);
        }
        
        // Update conversations list
        fetchConversations();
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, []);

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/messages/conversations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
        
        // Calculate total unread count
        const totalUnread = data.reduce((sum, conv) => sum + conv.unreadCount, 0);
        setUnreadCount(totalUnread);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/messages/conversations/${conversationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/messages/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  // Send message
  const sendMessage = async (receiverId, content) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId,
          content,
          messageType: 'text'
        })
      });
      
      if (response.ok) {
        const message = await response.json();
        
        // Add message to current conversation
        if (currentConversation && 
            message.conversationId === currentConversation.conversationId) {
          setMessages(prev => [...prev, message]);
        }
        
        // Emit socket event for real-time delivery
        if (socket) {
          const userData = localStorage.getItem('user');
          const user = userData ? JSON.parse(userData) : null;
          const senderId = user ? user.id : null;
          
          socket.emit('send_message', {
            senderId,
            receiverId,
            conversationId: message.conversationId,
            message
          });
        }
        
        // Update conversations
        fetchConversations();
        
        return message;
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  // Start new conversation
  const startConversation = async (receiverId) => {
    try {
      // Find existing conversation
      const existingConversation = conversations.find(conv => 
        conv.lastMessage.sender._id === receiverId || 
        conv.lastMessage.receiver._id === receiverId
      );
      
      if (existingConversation) {
        setCurrentConversation(existingConversation);
        await fetchMessages(existingConversation.conversationId);
        return existingConversation;
      } else {
        // Create new conversation by sending a message
        const message = await sendMessage(receiverId, 'Hello!');
        const newConversation = {
          conversationId: message.conversationId,
          lastMessage: message,
          unreadCount: 0
        };
        setCurrentConversation(newConversation);
        setMessages([message]);
        return newConversation;
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      throw error;
    }
  };

  const value = {
    socket,
    conversations,
    currentConversation,
    messages,
    contacts,
    unreadCount,
    fetchConversations,
    fetchMessages,
    fetchContacts,
    sendMessage,
    startConversation,
    setCurrentConversation,
    setMessages
  };

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
};
