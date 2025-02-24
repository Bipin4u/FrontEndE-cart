import React, { useState, useRef } from "react";
import axios from "axios";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import data from "../../../../data.json";
import { Toast } from "primereact/toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const toast = useRef<Toast>(null);
  const [loader, setLoader] = useState(false);

  const validatePassword = (value: string) => {
    setPassword(value);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(value)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase, a lowercase, a number, and a special character."
      );
    } else {
      setError("");
    }
  };

  const showWarn = (error: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) {
      return;
    }
    setLoader(true);
    try {
      const response = await axios.post(`${data.url}/auth/users/`, {
        username: username,
        email: email,
        password: password,
      });
      console.log("Registration successful:", response.data);
      navigate("/login");
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      showWarn(error.response.data.username);
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div
      style={{ height: "85vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Toast ref={toast} />
      <div className=" text-center ">
        <div className="h3 mb-4">Please login to your account</div>
        <form className="Login-form " onSubmit={handleSubmit}>
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
                type="email"
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
                onChange={(e) => validatePassword(e.target.value)}
                required
                className={`p-inputtext ${error ? "border-red-500" : ""}`}
              />
            </div>
            <div>
              {error && (
                <p className="mt-2  text-danger text-red-500 text-sm">
                  {error}
                </p>
              )}
            </div>
          </div>

          <div className="d-grid gap-2 m-3 mt-5">
            <Button
              label={loader ? "wait..." : "Submit"}
              className=" primaryBackground p-2 rounded"
            />
          </div>
        </form>

        <div className="d-flex justify-content-center mt-5">
          <div className="m-2 mx-4">Already have an account?</div>
          <Button
            onClick={() => navigate("/login")}
            label="Login"
            severity="danger"
            outlined
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

