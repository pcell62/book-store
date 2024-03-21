import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <div className="flex p-4 shadow-lg bg-slate-200 items-center justify-between">
      <Link to="/">
        <div className="text-2xl font-bold">Book Store</div>
      </Link>
      <div>
        {user && (
          <div className="space-x-4">
            <span>{user.name}</span>
            <Link
              to="/allbooks"
              className="bg-white text-blue-700 p-2 rounded-full hover:bg-slate-400"
            >
              View all books
            </Link>
            <button
              className="bg-white text-blue-700 p-2 rounded-full hover:bg-slate-400"
              onClick={handleClick}
            >
              Log Out
            </button>
          </div>
        )}
        {!user && (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="bg-white text-blue-700 p-2 rounded-full hover:bg-slate-400"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-700 p-2 rounded-full hover:bg-slate-400"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
