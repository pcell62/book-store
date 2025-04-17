import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useAuthContext } from "../../hooks/useAuthContext";
import ChatButton from "../components/ChatButton";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    setLoading(true);
    axios
      .get(`https://book-store-as2l.onrender.com/books/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("Book data:", response.data);
        console.log("Current user ID:", user._id);
        console.log("Book user_id:", response.data.user_id);
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user, id, navigate]);

  return (
    <div className="p-4 h-screen">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Price</span>
            <span>{book.price}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Description</span>
            <span>{book.description}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
          
          {/* Display seller info */}
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Seller</span>
            <span>{book.createdBy}</span>
          </div>
          
          {/* Only show the chat button if the book belongs to another user */}
          {book.user_id && book.user_id !== user._id && (
            <div className="my-4">
              <ChatButton 
                bookId={book._id} 
                sellerId={book.user_id} 
                sellerName={book.createdBy || 'Seller'}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowBook;
