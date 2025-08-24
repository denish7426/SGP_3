import React, { useState, useEffect } from 'react';
import { useMessaging } from '../../context/MessagingContext';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">New Conversation</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {searchTerm ? 'No contacts found' : 'No contacts available'}
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => handleStartConversation(contact)}
                className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {contact.name?.charAt(0)?.toUpperCase() || <FaUser className="text-sm" />}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-800">
                    {contact.name || 'Unknown'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {contact.email}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Loading State */}
        {isStarting && (
          <div className="p-4 text-center text-gray-500">
            <p>Starting conversation...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewConversation;
