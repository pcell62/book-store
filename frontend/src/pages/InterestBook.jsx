import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuthContext } from "../../hooks/useAuthContext";

const InterestBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const [book, setBook] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const handleInterestBook = () => {
    setLoading(true);
    axios
      .put(
        `http://localhost:5555/books/interest/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        if (
          response.data &&
          response.data.message === "Book Interested successfully"
        ) {
          enqueueSnackbar("Book Interested successfully", {
            variant: "success",
          });
          navigate("/");
        } else if (
          response.data &&
          response.data.message === "You cannot interest your own book"
        ) {
          enqueueSnackbar("You cannot be interested in your own book", {
            variant: "error",
          });
        } else if (
          response.data &&
          response.data.message ===
            "You have already expressed interest in this book"
        ) {
          enqueueSnackbar("You have already expressed interest in this book", {
            variant: "error",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4 h-screen">
      <BackButton />
      <h1 className="text-3xl my-4">Interest Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto p-8">
        <h3 className="text-2xl mb-8">
          Are You Sure You are interested in this book?
        </h3>

        <button
          className="p-4 bg-green-600 text-white w-full"
          onClick={handleInterestBook}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default InterestBook;
