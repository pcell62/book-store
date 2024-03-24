import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const ShowUser = () => {
  const navigate = useNavigate();
  const [ussr, setussr] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    setLoading(true);
    axios
      .get(`https://book-store-as2l.onrender.com/user/${id}`)
      .then((response) => {
        setussr(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 h-screen">
      <BackButton />
      <h1 className="text-3xl my-4">Show User</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Name</span>
            <span>{ussr.name}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Email</span>
            <span>{ussr.email}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowUser;
