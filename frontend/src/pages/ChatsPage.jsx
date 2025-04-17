import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

const ChatsPage = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chats`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setChats(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chats:', err);
        setError('Failed to load chats. Please try again later.');
        setLoading(false);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Please log in to view your chats.</p>
          <Link to="/login" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Conversations</h1>
      
      {chats.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-600">You don't have any conversations yet.</p>
          <Link to="/books" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {chats.map((chat) => {
            // Find the other participant (not the current user)
            const otherParticipant = chat.participants.find(
              (participant) => participant._id !== user._id
            );
            
            // Count unread messages
            const unreadCount = chat.messages.filter(
              (message) => !message.read && message.sender !== user._id
            ).length;
            
            return (
              <Link
                key={chat._id}
                to={`/chats/${chat._id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {otherParticipant?.name || 'Unknown User'}
                      </h3>
                      <p className="text-gray-600 text-sm">{chat.book.title}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(chat.lastUpdated).toLocaleDateString()}
                      </span>
                      {unreadCount > 0 && (
                        <span className="ml-3 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                  {chat.messages.length > 0 && (
                    <p className="mt-2 text-gray-600 truncate">
                      {chat.messages[chat.messages.length - 1].content}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChatsPage; 