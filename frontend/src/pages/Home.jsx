import React, { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="md:w-1/2 flex justify-center items-center bg-gray-200">
        <div className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-6xl font-black">
          Sell Your Books, <br /> More Efficiently
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center items-center">
        <img src={logo} alt="logo" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default HomePage;
