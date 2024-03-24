import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

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
    <div className="p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">All Books</h1>
      </div>
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
      {loading ? <Spinner /> : <CardAll books={filteredBooks} />}
    </div>
  );
};

export default Home;
