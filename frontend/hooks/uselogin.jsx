import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5555/user/login", {
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

  return { login, loading, error };
};
