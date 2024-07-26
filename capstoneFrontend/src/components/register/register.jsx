import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../register/registerSlice";
import { useCreateCartMutation } from "../cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../register/registerSlice";

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

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      let response = false;

      response = await registerUser(form).unwrap();
      const responseJson = JSON.parse(response);

      if (response) {
        const createUserCart = await createCart(responseJson.id);
        const cartId = JSON.parse(createUserCart.data);
        dispatch(setCart(cartId.id));
        // state.cart = cartId.id;
        // console.log("Cart ID:", cartId);
        // console.log(state, "after");
        navigate("/");
      }
    } catch (error) {
      console.log(error, "Registration error");
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={update}
            type="text"
            className="form-control"
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={update}
            type="text"
            className="form-control"
            placeholder="last Name"
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            name="email"
            value={form.email}
            onChange={update}
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            className="form-control"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
