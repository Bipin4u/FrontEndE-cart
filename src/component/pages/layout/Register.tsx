import React, { useState } from "react";
import axios from "axios";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import data from '../../../../data.json'

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${data.url}/auth/users/`, {
        username: username,
        email: email,
        password: password,
      });
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error: any) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div
      style={{ height: "75vh" }}
      className="d-flex m-5 align-items-center justify-content-center "
    >
      <div className="w-50 text-center m-auto">
        <div className="h3 mb-4">Please login to your account</div>
        <form className="Login-form" onSubmit={handleSubmit}>
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
                <div>Email</div>
              </span>
              <InputText
                id="Email"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
        </form>

        <div className="d-flex justify-content-center mt-5">
          <div className="m-2 mx-4">Already have an account?</div>
          <Button onClick={() => navigate("/login")} label="Login" severity="danger" outlined />
        </div>
      </div>
    </div>
  );
};

export default Register;

{
  /* <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 py-5">
  <div className="h3 mb-4 text-center">Please Create your account</div>
  <form className="w-50" onSubmit={handleSubmit}>
    <div className="m-4">
      <div className="input-group">
        <span className="input-group-text w-25">Username</span>
        <InputText
          id="username"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
          required
        />
      </div>
    </div>

    <div className="m-4">
     
      <div className="input-group">
        <span className="input-group-text w-25">Email</span>
        <InputText
          id="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
      </div>
    </div>

    <div className="m-4">
      <div className="input-group">
        <span className="input-group-text w-25">Password</span>
        <InputText
          id="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
        />
      </div>
    </div>

    <div className="d-grid gap-2 mb-4">
      <Button label="Create" className="primaryBackground p-2" />
    </div>
  </form>

  <div className="d-flex justify-content-center mt-4">
    <div className="m-2">Already have an account?</div>
    <Button
      onClick={() => navigate("/login")}
      label="Login"
      outlined
    />
  </div>
</div> */
}
