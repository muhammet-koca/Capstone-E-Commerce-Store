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
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInputFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      if (!inputFields.email || !inputFields.password) {
        setMessage("Please fill in all required fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputFields.email)) {
        setMessage("Please enter a valid email address.");
        return;
      }

      let success = await login(inputFields).unwrap();
      const successJson = JSON.parse(success);

      if (success) {
        setEmail(successJson.token.email);
        setMessage("Login successful!");
        navigate(`/`);
      }
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
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

        {message && <p>{message}</p>}

        <button className="button-confirm" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
