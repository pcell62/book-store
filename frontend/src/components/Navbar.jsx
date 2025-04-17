import React, { useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { PiUserBold } from "react-icons/pi";
import { BiHome, BiMenuAltRight } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-b-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and brand name */}
            <Link to="/" className="flex items-center space-x-2">
              <BiHome className="text-4xl text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Book Store
              </span>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center p-2 bg-indigo-50 rounded-full">
                    <PiUserBold className="text-xl text-indigo-600 mr-2" />
                    <span className="text-md font-semibold text-indigo-700">
                      {user.name}
                    </span>
                  </div>

                  <Link to="/allbooks">
                    <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-indigo-500 group-hover:from-purple-600 group-hover:to-indigo-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-indigo-200">
                      <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        View All Books
                      </span>
                    </button>
                  </Link>

                  <button
                    onClick={handleClick}
                    className="bg-gradient-to-r from-rose-500 to-red-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Link 
                    to="/login"
                    className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-md group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500"></span>
                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-purple-600 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                    <span className="relative text-white">Login</span>
                  </Link>

                  <Link 
                    to="/signup"
                    className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-md group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white"></span>
                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-indigo-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                    <span className="relative text-indigo-600 font-semibold">Sign Up</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none"
              >
                {isMenuOpen ? (
                  <IoMdClose className="w-6 h-6" />
                ) : (
                  <BiMenuAltRight className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg py-3 px-4">
          {user ? (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center p-2 bg-indigo-50 rounded-lg">
                <PiUserBold className="text-xl text-indigo-600 mr-2" />
                <span className="text-md font-semibold text-indigo-700">
                  {user.name}
                </span>
              </div>

              <Link 
                to="/allbooks"
                className="block w-full text-center relative overflow-hidden p-0.5 rounded-lg group bg-gradient-to-br from-purple-600 to-indigo-500 group-hover:from-purple-600 group-hover:to-indigo-500 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative block px-5 py-2.5 transition-all ease-in duration-200 bg-white rounded-md group-hover:bg-opacity-0 text-gray-900 group-hover:text-white">
                  View All Books
                </span>
              </Link>

              <button
                onClick={() => {
                  handleClick();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-rose-500 to-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <Link 
                to="/login"
                className="block w-full text-center relative overflow-hidden p-0.5 rounded-lg group bg-gradient-to-br from-purple-600 to-indigo-500 group-hover:from-purple-600 group-hover:to-indigo-500 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative block px-5 py-2.5 transition-all ease-in duration-200 bg-white rounded-md group-hover:bg-opacity-0 text-gray-900 group-hover:text-white">
                  Login
                </span>
              </Link>

              <Link 
                to="/signup"
                className="block w-full text-center bg-white border border-indigo-500 text-indigo-600 px-4 py-2 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
