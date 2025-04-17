# 📚 Book Exchange Platform

A modern web application that allows users to list, discover, and exchange books. Users can create listings for books they want to sell, trade, or donate, and express interest in books listed by others.

## ✨ Features

- **User Authentication**: Secure sign-up and login functionality
- **Book Listings**: Create, read, update, and delete book listings
- **Interest Registration**: Express interest in books listed by other users
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building component-based interfaces
- **React Router** - Navigation and routing solution for React applications
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Next-generation frontend tooling

### Backend
- **Node.js** - JavaScript runtime for server-side code
- **Express** - Web framework for creating API endpoints
- **Mongoose** - MongoDB object modeling for Node.js
- **MongoDB** - NoSQL database for storing application data

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.x or later)
- npm or pnpm package manager
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pcell62/book-store.git
   cd book-store
   ```

2. **Set up backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure the database**
   - Create a `.env` file in the backend directory with the following:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     JWT_SECRET=your_jwt_secret
     ```

4. **Set up frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the application**
   - For the backend:
     ```bash
     cd backend
     npm run dev
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm run dev
     ```

6. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/users/register | Register a new user |
| POST   | /api/users/login | Authenticate a user |
| GET    | /api/books | Get all book listings |
| GET    | /api/books/:id | Get a specific book listing |
| POST   | /api/books | Create a new book listing |
| PUT    | /api/books/:id | Update a book listing |
| DELETE | /api/books/:id | Delete a book listing |
| POST   | /api/interests | Express interest in a book |

## 🧩 Project Structure

```
book-store/
├── frontend/              # React frontend application
│   ├── public/            # Static assets
│   ├── src/               # React components and logic
│   ├── hooks/             # Custom React hooks
│   └── package.json       # Frontend dependencies
├── backend/               # Node.js backend application
│   ├── controllers/       # Route controller functions
│   ├── middleware/        # Express middleware
│   ├── models/            # Mongoose data models
│   ├── routes/            # API route definitions
│   └── package.json       # Backend dependencies
└── README.md              # Project documentation
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
