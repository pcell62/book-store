import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import {
  MdOutlineDelete,
  MdOutlineNumbers,
  MdOutlineUmbrella,
} from "react-icons/md";
import { useState } from "react";
import BookModal from "../home/BookModal";

const BookSingleCardAll = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border border-black rounded-lg p-3 bg-gradient-to-r from-sky-500 to-indigo-500 m-4">
      <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl bg-white">
        <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
          {book.publishYear}
        </h2>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">Author: {book.author}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">Entry Created By: {book.createdBy}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <MdOutlineNumbers className="text-red-300 text-2xl" />
          <h2 className="my-1">
            Number Of people Interested: {book.interestedPeople.length}
          </h2>
        </div>
        <div className="flex  items-center justify-center mt-4 p-4">
          <BiShow
            className="text-3xl text-blue-800 hover:text-black cursor-pointer mr-2"
            onClick={() => setShowModal(true)}
          />
          <div
            className="text-xl text-blue-800 hover:text-black cursor-pointer mr-2"
            onClick={() => setShowModal(true)}
          >
            More Info
          </div>
          <Link to={`/books/interest/${book._id}`}>
            <MdOutlineUmbrella className="text-2xl text-red-600 hover:text-black" />
          </Link>
        </div>
        {showModal && (
          <BookModal book={book} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default BookSingleCardAll;
