import React, { useState, useRef, useEffect } from 'react';
import { useMessaging } from '../../context/MessagingContext';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

const ChatWindow = () => {
  const {
    currentConversation,
    messages,
    sendMessage,
    setCurrentConversation
  } = useMessaging();

  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getOtherParticipant = () => {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    const currentUserId = user ? user.id : null;
    const lastMessage = currentConversation.lastMessage;
    
    if (lastMessage.sender._id === currentUserId) {
      return lastMessage.receiver;
    } else {
      return lastMessage.sender;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const otherParticipant = getOtherParticipant();
      await sendMessage(otherParticipant._id, newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const otherParticipant = getOtherParticipant();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        {isMobile && (
          <button
            onClick={() => setCurrentConversation(null)}
            className="mr-3 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaArrowLeft className="text-sm" />
          </button>
        )}
        
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
          {otherParticipant.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {otherParticipant.name || otherParticipant.email}
          </h3>
          <p className="text-sm text-gray-500">
            {otherParticipant.email}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const userData = localStorage.getItem('user');
            const user = userData ? JSON.parse(userData) : null;
            const currentUserId = user ? user.id : null;
            const isOwnMessage = message.sender._id === currentUserId;
            
            return (
              <div
                key={message._id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isOwnMessage
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FaPaperPlane className="text-sm" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
 