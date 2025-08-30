import React from 'react';
import { useMessaging } from '../../context/MessagingContext'; // Assuming this context provides messaging logic
import { FaCircle, FaUser } from 'react-icons/fa'; // Added FaUser for default avatar

const ConversationList = () => {
  const {
    conversations,
    currentConversation,
    setCurrentConversation,
    fetchMessages
  } = useMessaging();

  const handleConversationClick = async (conversation) => {
    setCurrentConversation(conversation);
    await fetchMessages(conversation.conversationId);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
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

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-gray-600">
          <p className="text-lg font-medium">No conversations yet</p>
          <p className="text-sm mt-2">Start a new conversation to begin messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      {conversations.map((conversation) => {
        const otherParticipant = getOtherParticipant(conversation);
        const isActive = currentConversation?.conversationId === conversation.conversationId;
        const hasUnread = conversation.unreadCount > 0;

        return (
          <div
            key={conversation.conversationId}
            onClick={() => handleConversationClick(conversation)}
            className={`flex items-center p-4 cursor-pointer transition-all duration-200 ease-in-out border-l-4 ${
              isActive 
                ? 'bg-[#FFE8B4] border-[#6B3226] shadow-inner' // Active: Golden Sand background, Pine Tree border
                : 'hover:bg-gray-100 border-transparent' // Inactive: subtle hover
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-[#FF9F4F] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                {otherParticipant.name?.charAt(0)?.toUpperCase() || <FaUser className="text-xl text-white" />}
              </div>
              {hasUnread && (
                <FaCircle className="absolute -top-1 -right-1 text-red-500 text-xs animate-pulse" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 ml-4 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`text-base font-semibold truncate ${
                  hasUnread ? 'text-[#6B3226]' : 'text-gray-800'
                }`}>
                  {otherParticipant.name || otherParticipant.email}
                </h3>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {formatTime(conversation.lastMessage.createdAt)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <p className={`text-sm truncate ${
                  hasUnread ? 'text-[#6B3226] font-medium' : 'text-gray-600'
                }`}>
                  {conversation.lastMessage.content}
                </p>
                {hasUnread && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-2 flex-shrink-0 font-bold animate-bounce-small">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
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
        @keyframes bounceSmall {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-bounce-small { animation: bounceSmall 1s infinite ease-in-out; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
};

export default ConversationList;
