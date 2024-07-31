import React from "react";
import { useGetProductByIdQuery } from "../home/homeSlice";
import { useParams } from "react-router-dom";

const CartItem = ({ productId }) => {
  // console.log(productId.productId);
  // const { id } = useParams();
  const { data: cartItem } = useGetProductByIdQuery(productId);
  console.log(cartItem);
  // console.log(productId);

  return (
    cartItem && (
      <div className="single-product">
        <img src={cartItem.image} alt={cartItem.productName} />
        <h1>{cartItem.productName}</h1>
        <p className="price">${cartItem.price}</p>
      </div>
    )
  );
};

export default CartItem;
