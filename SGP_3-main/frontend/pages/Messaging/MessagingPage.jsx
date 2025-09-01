import React from 'react';
import MessagingInterface from '../../src/components/Messaging/MessagingInterface';
import { MessagingProvider } from '../../src/context/MessagingContext';

const MessagingPage = () => {
  return (
    <div className="h-screen w-screen bg-gray-900">
      <MessagingProvider>
        <MessagingInterface />
      </MessagingProvider>
    </div>
    
  );
};

export default MessagingPage;
