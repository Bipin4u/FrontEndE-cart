import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
    user: String;
    authToken: String;
    cartItem: any
    cartQuantity:number;
    loginUser: (credentials: { username: String; password: String }) => Promise<void>;
    userLogout: () => void;
    addCartDetails: (item_id: number, type:string) => void; 
  }
  
  const defaultContextValue: AuthContextType = {
    user: "",
    cartItem: {},
    cartQuantity: 0,
    authToken: "",
    loginUser: async () => {},
    userLogout: () => {},
    addCartDetails: (item_id: number, type:string) => {}, 
  };

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<String>("");
  const [authToken, setauthToken] = useState<String>("");
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const [cartItem,setCartItem] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setauthToken(token);
      retrieveUserDetails(token);
    }
  }, []);

  useEffect(()=>{
    if (authToken) {
        axios
          .get("http://127.0.0.1:8000/api/getcart/", {
            headers: {
              Authorization: `Token ${authToken}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setCartQuantity(res.data.length);
            setCartItem(res.data)
          })
          .catch((error) => {
            console.error("There was an error fetching the Cart Quantity Item!", error);

          });
      }
  },[authToken,cartQuantity])

  const loginUser = async ({
    username,
    password,
  }: {
    username: String;
    password: String;
  }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/token/login",
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
      const response = await axios.get("http://127.0.0.1:8000/auth/users/me/", {
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

  const addCartDetails = (item_id: number, type:string) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/cart/?type=${type}`,
        {
          item: item_id, // Pass the item ID as part of the request body
        },
        {
          headers: {
            Authorization: `Token ${authToken}`, // Pass the headers as a separate parameter
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setCartQuantity(qty=>qty+1)
        return 1
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart!", error);
        return 0
      });
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
    addCartDetails,
    cartQuantity,
    cartItem
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
