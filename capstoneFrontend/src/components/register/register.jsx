import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../register/registerSlice";
import { useCreateCartMutation } from "../cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../register/registerSlice";
import "../login/login.css";
import React from "react";

export default function Register({ setEmail }) {
  const [registerUser] = useRegisterMutation();
  const [createCart] = useCreateCartMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  // console.log(state);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (!form.firstName || !form.lastName || !form.email || !form.password) {
        setMessage("Please fill in all required fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setMessage("Please enter a valid email address.");
        return; 
      }

      if (form.password.length < 8) {
        setMessage("Password needs to be at least 8 characters.");
        return;
      }

      let response = false;

      response = await registerUser(form).unwrap();
      const responseJson = JSON.parse(response);

      if (response) {
        const createUserCart = await createCart(responseJson.id);
        const cartId = JSON.parse(createUserCart.data);
        dispatch(setCart(cartId.id));
        window.sessionStorage.setItem("Cart", cartId.id);
        setMessage("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={submit} className="form">
        <div>
          <label>*First Name:</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={update}
            type="text"
            placeholder="First Name"
            required
            className="input"
          />
        </div>
        <div>
          <label>*Last Name:</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={update}
            type="text"
            placeholder="Last Name"
            required
            className="input"
          />
        </div>
        <div>
          <label>*Email Address:</label>
          <input
            name="email"
            value={form.email}
            onChange={update}
            type="email"
            placeholder="Email Address"
            required
            className="input"
          />
        </div>
        <div>
          <label>*Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            placeholder="Password"
            required
            className="input"
          />
        </div>
        <p>* Indicates a required field.</p>
        {message && <p>{message}</p>}
        <button type="submit" className="button-confirm">
          Register
        </button>
      </form>
    </div>
  );
}
