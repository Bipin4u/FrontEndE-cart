import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import { AuthContext } from "../../context/AuthContext";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
 
<div style={{ height: "75vh" }} className="d-flex m-5 align-items-center justify-content-center">
  <div className="w-50  text-center m-auto">
    <div className="h3 mb-4">Please login to your account</div>
    <form className="Login-form" onSubmit={handleLogin}>
      
      <div className="m-4">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon w-25">
            <div>Username</div>
          </span>
          <InputText 
            id="username" 
            placeholder="Username" 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="m-4">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon w-25">
            <div>Password</div>
          </span>
          <InputText 
            id="password" 
            placeholder="Password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="d-grid gap-2 m-3 mt-5">
        <Button label="Submit" className=" primaryBackground p-2 rounded" />
      </div>
      
      <div className="mb-3">
        <Link to='/'>Forgot Password?</Link>
      </div>
    </form>

    <div className="d-flex justify-content-center mt-5">
      <div className="m-2 mx-4">Don't have an account?</div>
      <Button 
        onClick={() => navigate("/register")} 
        label="Create New" 
        outlined 
        severity="danger"
      />
    </div>
  </div>
</div>

  );
};

export default Login;
