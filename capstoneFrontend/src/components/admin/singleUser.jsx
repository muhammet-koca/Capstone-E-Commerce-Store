import { useGetUserQuery } from "../features/updateSlice";
import { useNavigate, useParams } from "react-router-dom";
import "../home/product.css";
import React from "react";

const SingleUser = () => {
  const { id } = useParams();
  const { data: singleUser, isSuccess, isLoading } = useGetUserQuery(id);
  const navigate = useNavigate();

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

      <div className="button-container">
        <button
          className="back-button"
          type="button"
          onClick={() => navigate("/users")}
        >
          Back
        </button>
        <button
          className="back-button"
          type="button"
          onClick={() => navigate(`/update/user/${id}`)}
        >
          Update User
        </button>
      </div>
    </div>
  );
};

export default SingleUser;
