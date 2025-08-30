import React, { useState, useEffect } from 'react';
import { useMessaging } from '../../context/MessagingContext'; // Assuming this context provides messaging logic
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import NewConversation from './NewConversation';
import { FaComments, FaPlus } from 'react-icons/fa';

const MessagingInterface = () => {
  const {
    conversations,
    currentConversation,
    fetchConversations,
    fetchContacts,
    unreadCount
  } = useMessaging();

  const [showNewConversation, setShowNewConversation] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetchConversations();
    fetchContacts();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE8B4] via-[#FF9F4F] to-[#B85D34] flex items-center justify-center p-4 md:p-8 font-sans text-[#6B3226]">
      <div className="flex w-full max-w-6xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Sidebar - Conversations List */}
        <div className={`${isMobile && currentConversation ? 'hidden' : 'flex'} flex-col w-full md:w-80 bg-white border-r-2 border-gray-200 rounded-l-3xl`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b-2 border-gray-200 bg-gradient-to-r from-[#6B3226] to-[#B85D34] text-white rounded-tl-3xl shadow-sm">
            <div className="flex items-center space-x-3">
              <FaComments className="text-[#FFE8B4] text-2xl" />
              <h2 className="text-xl font-bold text-[#FFE8B4]">Messages</h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold animate-pulse-small">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={() => setShowNewConversation(true)}
              className="p-2 text-[#FFE8B4] hover:text-white hover:bg-opacity-20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFE8B4] focus:ring-offset-2 focus:ring-offset-[#6B3226]"
            >
              <FaPlus className="text-lg" />
            </button>
          </div>

          {/* Conversations List */}
          <ConversationList />
        </div>

        {/* Chat Window */}
        {currentConversation ? (
          <div className={`${isMobile && !currentConversation ? 'hidden' : 'flex'} flex-1 flex-col`}>
            <ChatWindow />
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 rounded-r-3xl">
            <div className="text-center text-gray-600 p-8">
              <FaComments className="text-7xl mx-auto mb-4 text-gray-300" />
              <h3 className="text-2xl font-semibold mb-2 text-[#6B3226]">Select a conversation</h3>
              <p className="text-base text-gray-700">Choose a conversation from the list or start a new one</p>
            </div>
          </div>
        )}

        {/* New Conversation Modal */}
        {showNewConversation && (
          <NewConversation onClose={() => setShowNewConversation(false)} />
        )}
      </div>
      {/* Custom CSS for Animations (re-included for completeness) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSmall {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slideInUp { animation: slideInUp 0.5s ease-out forwards; }
        .animate-pulse-small { animation: pulseSmall 1.5s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default MessagingInterface;
