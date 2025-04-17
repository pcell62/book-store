import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuthContext } from "../../hooks/useAuthContext";
import { BiBook, BiUser, BiCalendar, BiDollar, BiText } from "react-icons/bi";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      description,
      price,
    };
    setLoading(true);
    axios
      .post("https://book-store-as2l.onrender.com/books", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created successfully", { variant: "success" });
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error: " + (error.response?.data?.message || "Failed to create book"), { variant: "error" });
        console.log(error);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <BackButton />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ml-4">
          Add a New Book
        </h1>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md animate-fadeIn">
        <div className="grid gap-6 mb-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Book Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiBook className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900"
                placeholder="Enter book title"
                required
              />
            </div>
          </div>

          {/* Author Input */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900"
                placeholder="Enter author name"
                required
              />
            </div>
          </div>

          {/* Year and Price - Two Column Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Publish Year Input */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Publication Year
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="year"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900"
                  placeholder="Year"
                  required
                />
              </div>
            </div>

            {/* Price Input */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BiDollar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900"
                  placeholder="Price"
                />
              </div>
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <BiText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900"
                placeholder="Enter book description"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSaveBook}
          className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium text-md shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.01]"
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
