import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow, BiSolidHappy } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle, BsPeopleFill } from "react-icons/bs";
import {
  MdOutlineDelete,
  MdOutlineNumbers,
  MdOutlineUmbrella,
} from "react-icons/md";
import { FaUser, FaHeart } from "react-icons/fa";
import { useState } from "react";
import BookModal from "../home/BookModal";

const BookSingleCardAll = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative bg-white m-4 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
        {/* Cover image overlay with gradient */}
        <div 
          className="h-40 bg-cover bg-center relative" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1456513080867-f24f824f85e3?q=80&w=2946&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/80 to-blue-500/40"></div>
          <div className="absolute top-2 right-2 bg-emerald-600 text-white font-bold py-1 px-3 rounded-lg shadow-lg">
            {book.publishYear}
          </div>
        </div>

        {/* Book content */}
        <div className="p-5 flex-grow flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{book.title}</h2>
          
          <div className="flex items-center gap-x-2 mt-1">
            <BiUserCircle className="text-emerald-600 text-xl" />
            <p className="text-gray-600 line-clamp-1">{book.author}</p>
          </div>
          
          <div className="mt-3 flex items-start gap-x-2">
            <FaUser className="text-blue-600 text-lg mt-1" />
            <div>
              <p className="text-gray-500 text-sm">Created By</p>
              <span className="text-blue-600 font-medium">{book.createdBy}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-x-2 mt-3 text-gray-700">
            <BsPeopleFill className="text-emerald-500 text-lg" />
            <p className="text-sm">
              <span className="font-semibold">{book.interestedPeople.length}</span> {book.interestedPeople.length === 1 ? 'person' : 'people'} interested
            </p>
          </div>
          
          <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <BiShow className="text-xl" />
              <span className="text-sm">View</span>
            </button>
            
            <Link 
              to={`/books/interest/${book._id}`}
              className="flex items-center gap-1 text-rose-500 hover:text-rose-700 transition-colors duration-300 group"
            >
              <FaHeart className="text-lg group-hover:scale-110 transition-transform" />
              <span className="text-sm">Interested</span>
            </Link>
          </div>
        </div>
        
        {showModal && (
          <BookModal book={book} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default BookSingleCardAll;
