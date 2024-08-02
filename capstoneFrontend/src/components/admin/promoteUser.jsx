import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePromoteUserMutation } from "./adminSlice";
import { useGetUserQuery } from "../features/updateSlice";
import "../login/login.css";
import React from "react";

export default function PromoteUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user } = useGetUserQuery(id);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("User ID:", id);
  }, [id]);

  const [updateUser] = usePromoteUserMutation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
        isAdmin: user.isAdmin || false,
      });
    }
  }, [user]);

  if (form.password.length < 8) {
    setMessage("Password needs to be at least 8 characters.");
    return;
  }

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUser = async (event) => {
    event.preventDefault();
    try {
      const response = await updateUser({ id, form });
      if (response) {
        alert("User updated!");
        navigate("/users");
      }
    } catch (error) {
      alert("Failed to update user.");
    }
  };

  return (
    <div id="form">
      <h1>
        Update User:{" "}
        {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
      </h1>
      <form onSubmit={handleUser} className="form">
        <div>
          <label>First Name:</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={update}
            type="text"
            placeholder="First Name"
            className="input"
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={update}
            type="text"
            placeholder="Last Name"
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
            placeholder="Enter email"
            required
            className="input"
          />
        </div>
        <div>
          <label>*Password:</label>
          <input
            name="password"
            value={form.password}
            onChange={update}
            type="password"
            placeholder="Password"
            required
            className="input"
          />
        </div>
        <div>
          <label>Admin:</label>
          <input
            name="isAdmin"
            checked={form.isAdmin}
            onChange={update}
            type="checkbox"
            className="admin-input"
          />
        </div>
        <p className="required-field">* Indicates a required field.</p>
        {message && <p>{message}</p>}
        <button type="submit" className="button-confirm">
          Update User
        </button>
      </form>
    </div>
  );
}
