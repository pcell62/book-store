import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
});

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  messages: [messageSchema],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update lastUpdated whenever a new message is added
chatSchema.pre('save', function(next) {
  if (this.isModified('messages')) {
    this.lastUpdated = Date.now();
  }
  next();
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat; 