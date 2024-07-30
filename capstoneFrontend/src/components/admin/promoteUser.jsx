import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDeleteUserMutation, usePromoteUserMutation } from "./adminSlice";
import { useGetUserQuery } from "../features/updateSlice";
import "../login/login.css";
import React from "react";

export default function PromoteUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user } = useGetUserQuery(id);
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    console.log("User ID:", id);
  }, [id]);

  const [updateUser] = usePromoteUserMutation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAdmin: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
        isAdmin: "",
      });
    }
  }, [user]);

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUser = async (event) => {
    event.preventDefault();
    try {
      const response = await updateUser({ id, form });
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log("Update error");
    }
  };

  const handleDeleteUser = async (event, id) => {
    event.preventDefault();
    try {
      const response = await deleteUser({ id });
      alert("User deleted!");
      navigate("/users");
    } catch (error) {
      console.log("Delete User error");
    }
  };

  return (
    <div id="form-group">
      <h1>
        Update User:{" "}
        {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
      </h1>
      <form onSubmit={handleUser} className="form">
        <div>
          <label>First Name</label>
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
          <label>Last Name</label>
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
          <label>*Email Address</label>
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
          <label>*Password</label>
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
          <label>Admin</label>
          <input
            name="isAdmin"
            value={form.isAdmin}
            onChange={update}
            type="text"
            className="input"
          />
        </div>
        <p>* Indicates a required field.</p>
        <button type="submit" className="button-confirm">
          Update User
        </button>
        <button
          onClick={(event) => handleDeleteUser(event, id)}
          className="btn btn-primary"
        >
          Delete User
        </button>
      </form>
    </div>
  );
}
