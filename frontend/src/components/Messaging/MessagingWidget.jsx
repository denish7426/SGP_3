import React, { useState, useEffect } from 'react';
import { useMessaging } from '../../context/MessagingContext'; // Assuming this context provides messaging logic
import { FaComments, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa'; // Added FaUser for avatar

const MessagingWidget = () => {
  const { unreadCount, conversations, fetchConversations, sendMessage } = useMessaging();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchConversations(); // Fetch conversations when widget opens
    }
  }, [isOpen, fetchConversations]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await sendMessage(selectedConversation.conversationId, selectedConversation.otherParticipantId, newMessage.trim()); // Assuming otherParticipantId is available
      setNewMessage('');
      fetchConversations(); // Refresh conversations to show new message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getOtherParticipant = (conversation) => {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    const currentUserId = user ? user.id : null;
    const lastMessage = conversation.lastMessage;
    
    if (lastMessage.sender._id === currentUserId) {
      return lastMessage.receiver;
    } else {
      return lastMessage.sender;
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] rounded-full p-4 shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95 animate-bounce-slow"
        >
          <div className="relative">
            <FaComments className="text-2xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FFE8B4] text-[#6B3226] text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border border-[#B85D34] animate-pulse-small">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Messaging Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 flex flex-col animate-fadeInUp">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-gray-200 bg-gradient-to-r from-[#6B3226] to-[#B85D34] text-white rounded-t-2xl shadow-sm">
            <h3 className="text-xl font-bold text-[#FFE8B4]">Messages</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#FFE8B4] hover:text-white hover:bg-opacity-20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFE8B4] focus:ring-offset-2 focus:ring-offset-[#6B3226]"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {selectedConversation ? (
              // Display messages for selected conversation (simplified)
              <div className="p-4 space-y-3">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-[#FF9F4F] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getOtherParticipant(selectedConversation)?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <h4 className="ml-3 font-semibold text-[#6B3226]">
                    {getOtherParticipant(selectedConversation)?.name || getOtherParticipant(selectedConversation)?.email}
                  </h4>
                  <button onClick={() => setSelectedConversation(null)} className="ml-auto text-gray-500 hover:text-[#6B3226]">
                    <FaArrowLeft />
                  </button>
                </div>
                {/* Simplified message display for widget */}
                {conversations.find(c => c.conversationId === selectedConversation.conversationId)?.messages?.slice(-5).map((msg, index) => {
                  const isOwn = msg.sender._id === JSON.parse(localStorage.getItem('user'))?.id;
                  return (
                    <div key={index} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] px-3 py-1.5 rounded-lg text-sm shadow-sm ${isOwn ? 'bg-[#6B3226] text-[#FFE8B4]' : 'bg-gray-200 text-[#6B3226]'}`}>
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-600 py-8">
                <FaComments className="text-5xl mx-auto mb-3 text-gray-300" />
                <p className="text-base font-medium">No messages yet</p>
                <p className="text-sm mt-1">Start a new conversation!</p>
              </div>
            ) : (
              <div className="space-y-2 p-4">
                {conversations.slice(0, 5).map((conversation, index) => (
                  <div
                    key={conversation.conversationId}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors shadow-sm animate-slideInUp delay-${index * 50}`}
                  >
                    <div className="w-9 h-9 bg-[#FF9F4F] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {getOtherParticipant(conversation)?.name?.charAt(0)?.toUpperCase() || <FaUser className="text-base text-white" />}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#6B3226] truncate">{getOtherParticipant(conversation)?.name || getOtherParticipant(conversation)?.email}</p>
                      <p className="text-xs text-gray-600 truncate">{conversation.lastMessage?.content}</p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 ml-2 flex-shrink-0 font-bold animate-pulse-small">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Message Input */}
          {selectedConversation && (
            <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:border-[#B85D34] text-[#6B3226] shadow-sm transition-all duration-200 ease-in-out"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-[#6B3226] text-[#FFE8B4] rounded-xl hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all duration-200 ease-in-out transform active:scale-95"
                >
                  <FaPaperPlane className="text-base" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }
        @keyframes pulseSmall {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce-slow { animation: bounceSlow 3s infinite ease-in-out; }
        .animate-pulse-small { animation: pulseSmall 1.5s infinite ease-in-out; }
        .animate-fadeInUp { animation: fadeInUp 0.3s ease-out forwards; }
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
        /* Delay utilities for staggered animations */
        .delay-0 { animation-delay: 0s; }
        .delay-50 { animation-delay: 0.05s; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-150 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </>
  );
};

export default MessagingWidget;
