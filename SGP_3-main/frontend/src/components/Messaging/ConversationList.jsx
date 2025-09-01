import React from 'react';
import { useMessaging } from '../../context/MessagingContext';
import { FaCircle } from 'react-icons/fa';

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
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-sm">No conversations yet</p>
          <p className="text-xs">Start a new conversation to begin messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conversation) => {
        const otherParticipant = getOtherParticipant(conversation);
        const isActive = currentConversation?.conversationId === conversation.conversationId;
        const hasUnread = conversation.unreadCount > 0;

        return (
          <div
            key={conversation.conversationId}
            onClick={() => handleConversationClick(conversation)}
            className={`flex items-center p-4 cursor-pointer transition-colors ${
              isActive 
                ? 'bg-blue-50 border-r-2 border-blue-500' 
                : 'hover:bg-gray-50'
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {otherParticipant.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              {hasUnread && (
                <FaCircle className="absolute -top-1 -right-1 text-red-500 text-xs" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 ml-3 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-medium truncate ${
                  hasUnread ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {otherParticipant.name || otherParticipant.email}
                </h3>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {formatTime(conversation.lastMessage.createdAt)}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <p className={`text-sm truncate ${
                  hasUnread ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}>
                  {conversation.lastMessage.content}
                </p>
                {hasUnread && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2 flex-shrink-0">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;
