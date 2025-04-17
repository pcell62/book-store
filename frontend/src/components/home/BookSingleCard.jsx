import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative bg-white m-4 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
        {/* Cover image overlay with gradient */}
        <div 
          className="h-40 bg-cover bg-center relative" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2874&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/80 to-purple-500/40"></div>
          <div className="absolute top-2 right-2 bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg shadow-lg">
            {book.publishYear}
          </div>
        </div>

        {/* Book content */}
        <div className="p-5 flex-grow flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{book.title}</h2>
          
          <div className="flex items-center gap-x-2 mt-1">
            <BiUserCircle className="text-indigo-600 text-xl" />
            <p className="text-gray-600 line-clamp-1">{book.author}</p>
          </div>
          
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowModal(true)}
              className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            >
              <BiShow className="text-2xl" />
            </button>
            
            <div className="flex space-x-3">
              <Link 
                to={`/books/details/${book._id}`}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                <BsInfoCircle className="text-xl" />
              </Link>
              
              <Link 
                to={`/books/edit/${book._id}`}
                className="text-amber-500 hover:text-amber-700 transition-colors duration-300"
              >
                <AiOutlineEdit className="text-xl" />
              </Link>
              
              <Link 
                to={`/books/delete/${book._id}`}
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
              >
                <MdOutlineDelete className="text-xl" />
              </Link>
            </div>
          </div>
        </div>
        
        {showModal && (
          <BookModal book={book} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default BookSingleCard;
