import { useGetUserQuery } from "../features/updateSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../app/api";
import "../home/product.css";

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
      <p className="price">email:{singleUser.email}</p>

      <div className="button-container">
        <button
          className="back-button"
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
