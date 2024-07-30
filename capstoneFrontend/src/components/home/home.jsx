import { useGetProductQuery } from "./homeSlice";
import { useGetUserQuery } from "../features/updateSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./home.css";
import { useSelector } from "react-redux";

export default function Home() {
  const { data: products = [], isSuccess, isLoading } = useGetProductQuery();

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
        products.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product.id}`} className="product-link">
              <img
                src={product.image}
                alt={product.productName}
                className="product-image"
              />
              <h2 className="product-name">{product.productName}</h2>
              <p className="product-price">
                Price: ${product.price.toFixed(2)}
              </p>
            </Link>
          </div>
        ))}
    </div>
  );
}
