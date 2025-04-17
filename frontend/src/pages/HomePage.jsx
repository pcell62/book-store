import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle, BsSearch } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { useLogout } from "../../hooks/useLogout";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

import IntCrdAll from "../components/IntBook/IntCrdAll";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [interestBooks, setInterestBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    setLoading(true);
    if (user) {
      axios
        .get("https://book-store-as2l.onrender.com/books", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setBooks(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    setLoading(true);
    if (user) {
      axios
        .get("https://book-store-as2l.onrender.com/books/interest", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setInterestBooks(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [user]);

  const [titleSearch, setTitleSearch] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");
  const [yearSearch, setYearSearch] = useState("");

  const handleTitleSearch = (e) => {
    setTitleSearch(e.target.value);
  };

  const handleAuthorSearch = (e) => {
    setAuthorSearch(e.target.value);
  };

  const handleYearSearch = (e) => {
    setYearSearch(e.target.value);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(titleSearch.toLowerCase()) &&
      book.author.toLowerCase().includes(authorSearch.toLowerCase()) &&
      book.publishYear.toString().includes(yearSearch)
  );

  const filteredInterestBooks = interestBooks.filter(
    (interestBooks) =>
      interestBooks.title.toLowerCase().includes(titleSearch.toLowerCase()) &&
      interestBooks.author.toLowerCase().includes(authorSearch.toLowerCase()) &&
      interestBooks.publishYear.toString().includes(yearSearch)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Your Personal Book Collection
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage and explore your book collection with ease. Search for books, add new ones, and keep track of your reading interests.
        </p>
      </div>

      {/* Search filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BsSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={titleSearch}
                onChange={handleTitleSearch}
                placeholder="Search by title"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BiUserCircle className="text-gray-400" />
              </div>
              <input
                type="text"
                value={authorSearch}
                onChange={handleAuthorSearch}
                placeholder="Search by author"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-400 text-sm">Year</span>
              </div>
              <input
                type="text"
                value={yearSearch}
                onChange={handleYearSearch}
                placeholder="Search by year"
                className="w-full pl-16 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Your books section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 relative">
            <span className="relative z-10">Books added by you</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-indigo-200 rounded-sm -z-10"></span>
          </h2>
          <Link
            to="/books/create"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center gap-2 hover:scale-105 transform"
          >
            <MdOutlineAddBox className="text-xl" />
            <span>Add Book</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <Spinner />
          </div>
        ) : (
          <>
            {filteredBooks.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-500">No books found. Add some books to your collection!</p>
              </div>
            ) : (
              <BooksCard books={filteredBooks} />
            )}
          </>
        )}
      </div>

      {/* Interested books section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 relative">
          <span className="relative z-10">Books you are Interested in</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-purple-200 rounded-sm -z-10"></span>
        </h2>

        {loading ? (
          <div className="flex justify-center p-8">
            <Spinner />
          </div>
        ) : (
          <>
            {filteredInterestBooks.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-500">No interest books found. Explore all books to add some to your interests!</p>
              </div>
            ) : (
              <IntCrdAll books={filteredInterestBooks} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
