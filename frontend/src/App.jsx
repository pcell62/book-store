import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import AllBooks from "./pages/AllBooks";
import InterestBook from "./pages/InterestBook";
import HomePage from "./pages/HomePage";
import ShowUser from "./pages/ShowUser";

const App = () => {
  return (
    <div className="bg-slate-200">
      <div className="max-w-[88rem] m-auto ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:id" element={<ShowUser />} />
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/books/interest/:id" element={<InterestBook />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
