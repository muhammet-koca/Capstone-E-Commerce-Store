import React from "react";
import { useGetProductByIdQuery } from "../home/homeSlice";
// import { useParams } from "react-router-dom";

const CartItem = ({ productId }) => {
  const { data: cartItem, isLoading } = useGetProductByIdQuery(productId);

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    cartItem && (
      <div className="single-product">
        <img
          className="cart-image"
          src={cartItem.image}
          alt={cartItem.productName}
          height="200px"
        />
        <h1>{cartItem.productName}</h1>
        <p className="price">${cartItem.price}</p>
      </div>
    )
  );
};

export default CartItem;
