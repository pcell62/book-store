import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full bg-white rounded-xl shadow-2xl overflow-hidden animate-fadeIn"
      >
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 relative">
          <div className="flex justify-between items-center">
            <h3 className="text-white text-xl font-bold">Book Details</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 transition-colors"
            >
              <AiOutlineClose className="text-2xl" />
            </button>
          </div>
        </div>
        
        {/* Book Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full font-medium text-sm mb-4 flex items-center">
              <FaRegCalendarAlt className="mr-2" />
              Published in {book.publishYear}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
            
            <div className="flex items-center text-gray-600 mb-4">
              <BiUserCircle className="text-indigo-500 text-xl mr-2" />
              <span className="font-medium">{book.author}</span>
            </div>
            
            {book.price && (
              <div className="flex items-center text-gray-700 mb-4">
                <HiCurrencyDollar className="text-green-600 text-xl mr-2" />
                <span className="font-medium">${book.price}</span>
              </div>
            )}
          </div>
          
          {book.description && (
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-sm uppercase text-gray-500 font-semibold mb-2">Description</h4>
              <p className="text-gray-700 leading-relaxed">
                {book.description || "No description available for this book."}
              </p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
