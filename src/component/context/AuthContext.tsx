import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from '../../../data.json'

export interface AuthContextType {
  user: String;
  authToken: String;
  loginUser: (credentials: {
    username: String;
    password: String;
  }) => Promise<void>;
  userLogout: () => void;
}

const defaultContextValue: AuthContextType = {
  user: "",

  authToken: "",
  loginUser: async () => {},
  userLogout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<String>("");
  const [authToken, setauthToken] = useState<String>("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setauthToken(token);
      retrieveUserDetails(token);
    }
  }, []);

  const loginUser = async ({
    username,
    password,
  }: {
    username: String;
    password: String;
  }) => {
    try {
      const response = await axios.post(
        `${data.url}/auth/token/login`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("authToken", response.data.auth_token);
      setauthToken(response.data.auth_token);
      await retrieveUserDetails(response.data.auth_token);
      navigate("/");
    } catch (error: any) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const retrieveUserDetails = async (token: String) => {
    try {
      const response = await axios.get(`${data.url}/auth/users/me/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUser(response.data.username);
    } catch (error: any) {
      console.error(
        "Error retrieving user details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const userLogout = () => {
    setUser("");
    localStorage.removeItem("authToken");
    setauthToken("");
    navigate("/login");
  };

  const contextData = {
    user,
    authToken,
    loginUser,
    userLogout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
