import { useGetUserQuery } from "../features/updateSlice";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useDeleteUserMutation } from "./adminSlice";
import "../home/home.css";

const SingleUser = () => {
  const { id } = useParams();
  const { data: singleUser, isSuccess, isLoading } = useGetUserQuery(id);
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (event, id) => {
    event.preventDefault();
    try {
      const response = await deleteUser({ id });
      if (response) {
        alert("User deleted!");
        navigate("/users");
      }
    } catch (error) {
      console.log("Delete User error");
      alert("Failed to delete user.");
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isSuccess || !singleUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="single-product">
      <h1>
        {singleUser.firstName} {singleUser.lastName}
      </h1>
      <p className="price">Email:{singleUser.email}</p>

      <div className="form">
        <button
          onClick={(event) => handleDeleteUser(event, id)}
          className="button-confirm"
        >
          Delete User
        </button>
        <button
          className="button-confirm"
          type="button"
          onClick={() => navigate(`/update/user/${id}`)}
        >
          Update User
        </button>
        <button
          className="button-confirm"
          type="button"
          onClick={() => navigate("/users")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SingleUser;
