import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loginUser } = useContext(AuthContext); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser({username, password}); 
    } catch (error) {
      console.error("Login failed:", error); 
    }
  };

  return (
    <div className="Login-container">
      <h2 className="Login-title">Login</h2>
      <form className="Login-form" onSubmit={handleLogin}>
        <div className="Login-input-group">
          <label className="Login-label">Username</label>
          <br></br>
          <input className="Login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div className="Login-input-group">
          <label className="Login-label">Password</label>
          <br></br>
          <input className="Login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="Login-button" type="submit">
          Login
        </button>
      </form>
      <button className="Login-button">
        <Link style={{ textDecoration: "none", color: "white" }} to="/register">
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
