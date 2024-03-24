import React, { useEffect, useState } from "react";
import { useLogin } from "../../hooks/uselogin";
import Spinner from "../components/Spinner";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, error, loading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Log In</h1>
      {loading && <Spinner />}
      <form className="w-64" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log In
        </button>
        {error && (
          <div
            className="bg-red-100 mt-2 border border-red-400 text-red-700 px-4 py-2 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
