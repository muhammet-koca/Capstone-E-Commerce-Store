import { useState } from "react";
import { useLoginMutation } from "../login/loginSlice";
import { useNavigate } from "react-router-dom";
import "./login.css";
import React from "react";

const Login = ({ setEmail }) => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();

  const handleChange = (e) => {
    setInputFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let success = await login(inputFields).unwrap();
      const successJson = JSON.parse(success);
      if (success) {
        setEmail(successJson.token.email);
        navigate(`/`);
      }
    } catch (error) {
      // add error handling for future
      console.log(error);
      document.getElementById("successful").innerText = "Invalid Credentials";
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="email">
          *Email Address:{" "}
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="input"
          />
        </label>
        <label className="password">
          *Password:{" "}
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="input"
          />
        </label>
        <p className="required-field">* Indicates a required field.</p>
        <button className="button-confirm" type="submit">
          Login
        </button>
        <h3 id="successful"></h3>
      </form>
    </div>
  );
};

export default Login;
