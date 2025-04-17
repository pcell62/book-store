import express from 'express';
import { 
  getUserChats,
  getChatById,
  createChat,
  sendMessage,
  markAsRead
} from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All chat routes require authentication
router.use(protect);

// Get all chats for the logged-in user
router.get('/', getUserChats);

// Get a specific chat by ID
router.get('/:id', getChatById);

// Create a new chat
router.post('/', createChat);

// Add a message to a chat
router.post('/:id/messages', sendMessage);

// Mark messages as read
router.patch('/:id/read', markAsRead);

export default router; 