import { useGetAllUsersQuery } from "./adminSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../home/home.css";
import React from "react";

export default function GetUsers() {
  const { data: users = [], isSuccess, isLoading } = useGetAllUsersQuery();
  // const { getUserById } = useGetUserQuery();

  useEffect(() => {
    const userId = () => {};
    userId();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="product-list">
      {isSuccess &&
        users.map((user) => (
          <div className="product-card" key={user.id}>
            <Link to={`/user/${user.id}`} className="product-link">
              <h2 className="product-name">
                {user.firstName}
                {user.lastName}
              </h2>
            </Link>
          </div>
        ))}
    </div>
  );
}
