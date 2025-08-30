import React, { useState, useEffect } from 'react';
import { useMessaging } from '../../context/MessagingContext'; // Assuming this context provides messaging logic
import { FaTimes, FaSearch, FaUser } from 'react-icons/fa';

const NewConversation = ({ onClose }) => {
  const { contacts, startConversation } = useMessaging();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    const filtered = contacts.filter(contact =>
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, searchTerm]);

  const handleStartConversation = async (contact) => {
    setIsStarting(true);
    try {
      await startConversation(contact._id);
      onClose();
    } catch (error) {
      console.error('Error starting conversation:', error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    // Changed backdrop to a more refined, darker gradient for a premium feel
    <div className="fixed inset-0 bg-gradient-to-br from-[#6B3226] to-[#4A2018] bg-opacity-95 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col border border-gray-100 transform scale-95 animate-scaleUpBounce">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b-2 border-gray-200 bg-gradient-to-r from-[#6B3226] to-[#B85D34] text-white rounded-t-2xl shadow-sm">
          <h2 className="text-xl font-bold text-[#FFE8B4]">New Conversation</h2>
          <button
            onClick={onClose}
            className="p-2 text-[#FFE8B4] hover:text-white hover:bg-opacity-20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFE8B4] focus:ring-offset-2 focus:ring-offset-[#6B3226]"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B85D34] focus:border-[#B85D34] text-[#6B3226] shadow-sm transition-all duration-200 ease-in-out"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredContacts.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              <p className="text-lg font-medium">{searchTerm ? 'No contacts found' : 'No contacts available'}</p>
            </div>
          ) : (
            filteredContacts.map((contact, index) => (
              <div
                key={contact._id}
                onClick={() => handleStartConversation(contact)}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200 border-b border-gray-100 last:border-b-0 animate-slideInUp delay-${index * 50}`}
              >
                <div className="w-12 h-12 bg-[#FF9F4F] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                  {contact.name?.charAt(0)?.toUpperCase() || <FaUser className="text-xl text-white" />}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-base font-semibold text-[#6B3226]">{contact.name || 'Unknown'}</h3>
                  <p className="text-sm text-gray-700">{contact.email}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Loading State */}
        {isStarting && (
          <div className="p-4 text-center text-gray-600 border-t border-gray-200 bg-gray-50">
            <p className="font-medium animate-pulse">Starting conversation...</p>
          </div>
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
        @keyframes scaleUpBounce {
          0% { transform: scale(0.9); opacity: 0; }
          60% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideInUp { animation: slideInUp 0.4s ease-out forwards; }
        .animate-scaleUpBounce { animation: scaleUpBounce 0.4s ease-out forwards; }
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
        /* Add more as needed */
      `}</style>
    </div>
  );
};

export default NewConversation;
