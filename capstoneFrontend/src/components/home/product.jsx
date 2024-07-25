import { useGetProductByIdQuery } from "./homeSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../app/api";
import { useAddToCartMutation } from "../cart/cartSlice";
import "./product.css";

const SingleProduct = () => {
  const { id } = useParams();
  const {
    data: singleProduct,
    isSuccess,
    isLoading,
  } = useGetProductByIdQuery(id);
  const [addToCart] = useAddToCartMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isSuccess || !singleProduct) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = async () => {
    try {
      await addToCart({ id }).unwrap();
      alert("Added to Cart");
    } catch (error) {
      console.log("Failed to add to cart", error);
    }
  };

  return (
    <div className="single-product">
      <img src={singleProduct.image} alt={singleProduct.productName} />
      <h1>{singleProduct.productName}</h1>
      <p className="price">${singleProduct.price}</p>
      <button type="button" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <div className="button-container">
        <button
          className="back-button"
          type="button"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
