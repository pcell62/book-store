import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ChatPage = () => {
  const { chatId } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch chat data
  useEffect(() => {
    const fetchChat = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chats/${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setChat(response.data);
        setLoading(false);
        
        // Mark messages as read
        await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}/chats/${chatId}/read`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (err) {
        console.error('Error fetching chat:', err);
        setError(err.response?.data?.message || 'Failed to load chat. Please try again later.');
        setLoading(false);
      }
    };

    if (token && chatId) {
      fetchChat();
    }
  }, [chatId, token]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat?.messages]);

  // Poll for new messages every 10 seconds
  useEffect(() => {
    if (!chatId || !token) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chats/${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Only update if there are new messages
        if (
          response.data.messages.length !== chat?.messages.length ||
          response.data.lastUpdated !== chat?.lastUpdated
        ) {
          setChat(response.data);
          
          // Mark messages as read
          await axios.patch(
            `${import.meta.env.VITE_API_BASE_URL}/chats/${chatId}/read`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
        }
      } catch (err) {
        console.error('Error polling chat:', err);
      }
    }, 10000);

    return () => clearInterval(pollInterval);
  }, [chatId, token, chat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || sending) return;

    try {
      setSending(true);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/chats/${chatId}/messages`,
        { content: message },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Refresh chat data to show the new message
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chats/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setChat(response.data);
      setMessage('');
      setSending(false);
    } catch (err) {
      console.error('Error sending message:', err);
      setSending(false);
      // Show error to user
      alert('Failed to send message. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
        <button
          onClick={() => navigate('/chats')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Chats
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Please log in to view this chat.</p>
          <Link to="/login" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Chat not found or you don't have permission to view it.</p>
        </div>
        <button
          onClick={() => navigate('/chats')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Chats
        </button>
      </div>
    );
  }

  // Find the other participant (not the current user)
  const otherParticipant = chat.participants.find(
    (participant) => participant._id !== user._id
  );

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col h-screen">
      {/* Chat header */}
      <div className="bg-white p-4 shadow-md rounded-t-lg flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/chats')}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-semibold">{otherParticipant?.name || 'Unknown User'}</h2>
            <Link to={`/books/${chat.book._id}`} className="text-sm text-blue-500 hover:underline">
              {chat.book.title}
            </Link>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="space-y-4">
          {chat.messages.length === 0 ? (
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-gray-600">
                No messages yet. Start the conversation by sending a message.
              </p>
            </div>
          ) : (
            chat.messages.map((msg, index) => {
              const isCurrentUser = msg.sender._id === user._id;
              return (
                <div
                  key={index}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                      isCurrentUser
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p
                      className={`text-xs text-right mt-1 ${
                        isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="bg-white p-4 shadow-md rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={sending}
          />
          <button
            type="submit"
            className={`ml-2 bg-blue-500 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              sending || !message.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            disabled={sending || !message.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage; 