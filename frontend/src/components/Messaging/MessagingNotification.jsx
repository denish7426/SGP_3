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
      className="fixed bottom-6 right-6 bg-[#6B3226] hover:bg-opacity-90 text-[#FFE8B4] rounded-full p-4 shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95 z-50 animate-bounce-slow"
    >
      <div className="relative">
        <FaComments className="text-2xl" />
        <span className="absolute -top-2 -right-2 bg-[#FFE8B4] text-[#6B3226] text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border border-[#B85D34] animate-pulse-small">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      </div>
      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }
        @keyframes pulseSmall {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-bounce-slow { animation: bounceSlow 3s infinite ease-in-out; }
        .animate-pulse-small { animation: pulseSmall 1.5s infinite ease-in-out; }
      `}</style>
    </button>
  );
};

export default MessagingNotification;
