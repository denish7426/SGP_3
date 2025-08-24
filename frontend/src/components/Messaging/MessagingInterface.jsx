import React, { useState, useEffect } from 'react';
import { useMessaging } from '../../context/MessagingContext';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import NewConversation from './NewConversation';
import { FaComments, FaPlus, FaTimes } from 'react-icons/fa';

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
    <div className="flex h-full bg-gray-50">
      {/* Sidebar - Conversations List */}
      <div className={`${isMobile && currentConversation ? 'hidden' : 'flex'} flex-col w-full md:w-80 bg-white border-r border-gray-200`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FaComments className="text-blue-500 text-xl" />
            <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setShowNewConversation(true)}
            className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
          >
            <FaPlus className="text-sm" />
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
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center text-gray-500">
            <FaComments className="text-6xl mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
            <p className="text-sm">Choose a conversation from the list or start a new one</p>
          </div>
        </div>
      )}

      {/* New Conversation Modal */}
      {showNewConversation && (
        <NewConversation onClose={() => setShowNewConversation(false)} />
      )}
    </div>
  );
};

export default MessagingInterface;
