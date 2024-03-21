import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const Signup = async (name, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5555/user/signup", {
        name,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN", payload: response.data });
      navigate("/");
    } catch (error) {
      setError(JSON.stringify(error.response.data.error));
    } finally {
      setLoading(false);
    }
  };

  return { Signup, loading, error };
};
