import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "./updateSlice";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user } = useGetUserQuery(id);

  useEffect(() => {
    console.log("User ID:", id);
  }, [id]);

  const [updateUser] = useUpdateUserMutation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
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

  return (
    <div>
      <h1>
        Update User:{" "}
        {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
      </h1>
      <form onSubmit={handleUser}>
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
            placeholder="Last Name"
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
          Submit
        </button>
      </form>
    </div>
  );
}
