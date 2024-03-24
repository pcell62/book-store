import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuthContext } from "../../hooks/useAuthContext";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    setLoading(true);
    axios
      .get(`https://book-store-as2l.onrender.com/books/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Chack console");
        console.log(error);
      });
  }, [user]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      description,
      price,
    };
    setLoading(true);
    axios
      .put(`https://book-store-as2l.onrender.com/books/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4 h-screen">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
