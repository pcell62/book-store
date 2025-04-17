import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

const ChatButton = ({ bookId, sellerId, sellerName }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleStartChat = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Don't start a chat with yourself
    if (user._id === sellerId) {
      alert("You can't start a chat with yourself.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `https://book-store-as2l.onrender.com/chats`,
        {
          bookId,
          recipientId: sellerId
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      // If a chat already exists, the API sends back the chatId
      const chatId = response.data.chatId || response.data.chat._id;
      navigate(`/chats/${chatId}`);
    } catch (error) {
      console.error('Error starting chat:', error);
      setLoading(false);
      alert('Could not start chat. Please try again later.');
    }
  };

  return (
    <button
      onClick={handleStartChat}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Chat with {sellerName}
        </>
      )}
    </button>
  );
};

export default ChatButton;