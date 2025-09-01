import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';

const MessagingNotification = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (!token || !userData) return;

        const response = await fetch('http://localhost:3000/api/messages/conversations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const conversations = await response.json();
          const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
          setUnreadCount(totalUnread);
        }
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (unreadCount === 0) return null;

  return (
    <button
      onClick={() => navigate('/messages')}
      className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition-all duration-200 transform hover:scale-105 z-50"
    >
      <div className="relative">
        <FaComments className="text-xl" />
        <span className="absolute -top-2 -right-2 bg-white text-red-500 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      </div>
    </button>
  );
};

export default MessagingNotification;
