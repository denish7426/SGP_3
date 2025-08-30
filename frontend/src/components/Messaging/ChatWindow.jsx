import React, { useState, useRef, useEffect } from 'react';
import { useMessaging } from '../../context/MessagingContext'; // Assuming this context provides messaging logic
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
  await sendMessage(otherParticipant._id, newMessage.trim()); // Pass correct receiverId
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

  if (!currentConversation) {
    return null; // Should not happen if rendered conditionally by MessagingInterface
  }

  const otherParticipant = getOtherParticipant();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const currentUserId = user ? user.id : null;

  return (
    <div className="flex flex-col h-full bg-white rounded-r-2xl md:rounded-3xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-center p-4 md:p-5 border-b-2 border-gray-200 bg-gradient-to-r from-[#FFE8B4] to-[#FF9F4F] rounded-tr-2xl md:rounded-tr-3xl shadow-sm">
        {isMobile && (
          <button
            onClick={() => setCurrentConversation(null)}
            className="mr-3 p-2 text-[#6B3226] hover:text-[#B85D34] hover:bg-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-[#FFE8B4]"
          >
            <FaArrowLeft className="text-lg" />
          </button>
        )}
        
        <div className="w-12 h-12 bg-[#6B3226] rounded-full flex items-center justify-center text-[#FFE8B4] font-bold text-xl shadow-md">
          {otherParticipant.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        
        <div className="ml-4 flex-1">
          <h3 className="text-xl font-semibold text-[#6B3226]">
            {otherParticipant.name || otherParticipant.email}
          </h3>
          <p className="text-sm text-gray-700">
            {otherParticipant.email}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg font-medium">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.sender._id === currentUserId;
            
            return (
              <div
                key={message._id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow-md ${
                    isOwnMessage
                      ? 'bg-[#6B3226] text-[#FFE8B4] rounded-br-none' // Own messages: Pine Tree, Buttercream text
                      : 'bg-gray-200 text-[#6B3226] rounded-bl-none' // Other messages: Light gray, Pine Tree text
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    isOwnMessage ? 'text-[#FFE8B4] opacity-70' : 'text-gray-600'
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
      <div className="p-4 md:p-5 border-t-2 border-gray-200 bg-gray-50">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:border-[#B85D34] text-[#6B3226] shadow-sm transition-all duration-200 ease-in-out"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="px-5 py-3 bg-[#6B3226] text-[#FFE8B4] rounded-xl hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all duration-200 ease-in-out transform active:scale-95"
          >
            <FaPaperPlane className="text-lg" />
          </button>
        </form>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #B85D34; /* Burnt Sienna */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B3226; /* Dark Cognac */
        }
      `}</style>
    </div>
  );
};

export default ChatWindow;
