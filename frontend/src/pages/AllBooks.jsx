import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { BsSearch } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import CardAll from "../components/allbook/CardAll";

const Home = () => {
  const [books, setBooks] = useState([]);
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
        .get("https://book-store-as2l.onrender.com/books/allbooks", {
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Explore All Books
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover books from all users in the community. Find books you're interested in and add them to your collection.
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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
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
                className="w-full pl-16 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* All books section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 relative">
          <span className="relative z-10">Community Book Library</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-purple-200 rounded-sm -z-10"></span>
        </h2>

        {loading ? (
          <div className="flex justify-center p-8">
            <Spinner />
          </div>
        ) : (
          <>
            {filteredBooks.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-500">No books found. Try adjusting your search criteria.</p>
              </div>
            ) : (
              <CardAll books={filteredBooks} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
