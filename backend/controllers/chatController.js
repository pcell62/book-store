import Chat from '../models/chatModel.js';
import { User } from '../models/userModel.js';
import { Book } from '../models/bookModel.js';

// Get all chats for a user
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('Fetching chats for user:', userId);
    
    const chats = await Chat.find({ participants: userId })
      .populate('participants', 'name email')
      .populate('book', 'title author')
      .sort({ lastUpdated: -1 });
    
    console.log('Found chats:', chats);
    
    // Ensure we're always returning an array
    if (!Array.isArray(chats)) {
      console.error('Chat.find did not return an array, returning empty array instead');
      return res.status(200).json([]);
    }
    
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error in getUserChats:', error);
    res.status(500).json({ message: 'Error fetching chats', error: error.message });
  }
};

// Get a specific chat by ID
export const getChatById = async (req, res) => {
  try {
    const chatId = req.params.id;
    const userId = req.user._id;
    
    const chat = await Chat.findById(chatId)
      .populate('participants', 'name email')
      .populate('book', 'title author imageUrl price condition')
      .populate('messages.sender', 'name');
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    // Check if user is a participant
    if (!chat.participants.some(p => p._id.toString() === userId.toString())) {
      return res.status(403).json({ message: 'Not authorized to view this chat' });
    }
    
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat', error: error.message });
  }
};

// Create a new chat
export const createChat = async (req, res) => {
  try {
    const { bookId, recipientId } = req.body;
    const senderId = req.user._id;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    
    // Check if chat already exists between these users for this book
    const existingChat = await Chat.findOne({
      book: bookId,
      participants: { $all: [senderId, recipientId] }
    });
    
    if (existingChat) {
      return res.status(200).json({ message: 'Chat already exists', chatId: existingChat._id });
    }
    
    // Create new chat
    const newChat = new Chat({
      participants: [senderId, recipientId],
      book: bookId,
      messages: []
    });
    
    await newChat.save();
    
    res.status(201).json({ message: 'Chat created successfully', chat: newChat });
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat', error: error.message });
  }
};

// Add a message to a chat
export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const chatId = req.params.id;
    const senderId = req.user._id;
    
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    // Check if user is a participant
    if (!chat.participants.some(p => p.toString() === senderId.toString())) {
      return res.status(403).json({ message: 'Not authorized to send messages in this chat' });
    }
    
    // Add the message
    chat.messages.push({
      sender: senderId,
      content,
      timestamp: Date.now()
    });
    
    await chat.save();
    
    res.status(201).json({ message: 'Message sent successfully', chat });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

// Mark messages as read
export const markAsRead = async (req, res) => {
  try {
    const chatId = req.params.id;
    const userId = req.user._id;
    
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    // Check if user is a participant
    if (!chat.participants.some(p => p.toString() === userId.toString())) {
      return res.status(403).json({ message: 'Not authorized to access this chat' });
    }
    
    // Mark all unread messages not sent by the current user as read
    chat.messages.forEach(message => {
      if (!message.read && message.sender.toString() !== userId.toString()) {
        message.read = true;
      }
    });
    
    await chat.save();
    
    res.status(200).json({ message: 'Messages marked as read', chat });
  } catch (error) {
    res.status(500).json({ message: 'Error marking messages as read', error: error.message });
  }
}; 