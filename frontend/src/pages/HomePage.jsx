import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
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
    <div className="p-4 h-full">
      <div className="flex justify-center gap-x-4 my-4 flex-col md:flex-row">
        <input
          type="text"
          value={titleSearch}
          onChange={handleTitleSearch}
          placeholder="Search by title"
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <input
          type="text"
          value={authorSearch}
          onChange={handleAuthorSearch}
          placeholder="Search by author"
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <input
          type="text"
          value={yearSearch}
          onChange={handleYearSearch}
          placeholder="Search by year"
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl my-8">Books added by you</h1>
        <Link
          to="/books/create"
          className="relative overflow-hidden bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out p-2 border border-gray-700 text-white flex items-center space-x-2"
        >
          <MdOutlineAddBox className="text-3xl" />
          <div className="text-lg font-sans">Add Book</div>
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white opacity-0 hover:opacity-50 transition-all duration-500 ease-in-out"></span>
        </Link>
      </div>

      {loading ? <Spinner /> : <BooksCard books={filteredBooks} />}

      <h1 className="text-3xl my-8">Books you are Interested in</h1>

      {loading ? <Spinner /> : <IntCrdAll books={filteredInterestBooks} />}
    </div>
  );
};

export default Home;
