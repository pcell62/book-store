import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow, BiSolidHappy } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import {
  MdOutlineDelete,
  MdOutlineNumbers,
  MdOutlineUmbrella,
} from "react-icons/md";
import { useState } from "react";
import BookModal from "../home/BookModal";

const IntSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="border border-black rounded-lg p-3 bg-cover m-4"
      style={{
        backgroundImage:
          "url('https://th-thumbnailer.cdn-si-edu.com/sWf0xF1il7OWYO8j-PGqwBvxTAE=/1000x750/filters:no_upscale():focal(2550x1724:2551x1725)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/9a/d7/9ad71c28-a69d-4bc0-b03d-37160317bb32/gettyimages-577674005.jpg')",
      }}
    >
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
          <BiUserCircle className="text-blue-300 text-2xl" />
          <h2 className="my-1 space-y-2">
            <div>Entry Created By:</div>
            <Link
              to={`/user/${book.user_id}`}
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none"
            >
              {book.createdBy}
            </Link>
          </h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <MdOutlineNumbers className="text-red-300 text-2xl" />
          <h2 className="my-1">
            Number Of people Interested: {book.interestedPeople.length}
          </h2>
        </div>
        <div className="flex  items-center justify-around mt-4 p-4">
          <BiShow
            className="text-3xl text-blue-800 hover:text-black cursor-pointer mr-2"
            onClick={() => setShowModal(true)}
          />
        </div>
        {showModal && (
          <BookModal book={book} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default IntSingleCard;
