import {
  useGetCartQuery,
  useUpdateCartMutation,
  useCreateCartMutation,
  useDeleteCartMutation,
  useDeleteCartItemMutation,
} from "./cartSlice";
import { useGetProductByIdQuery } from "../home/homeSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import CartItem from "./cartItem";

export default function Cart() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: cart = [], isSuccess, isLoading } = useGetCartQuery({ id });
  const [updateCart] = useUpdateCartMutation();
  const createCart = useCreateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [quantities, setQuantities] = useState({});

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  const handleSubmit = async (event, cartItemId) => {
    event.preventDefault();
    try {
      if (!cart) {
        await createCart();
      }
      const response = await updateCart({
        id: cartItemId,
        form: { quantity: quantities[cartItemId] || 1 },
      }).unwrap();
      console.log(response);
      alert("Quantity updated!");
    } catch (error) {
      console.log("Update cart error", error);
      alert("Failed to update quantity.");
    }
  };

  const handleSelectChange = (event, cartItemId) => {
    setQuantities((prev) => ({
      ...prev,
      [cartItemId]: Number(event.target.value),
    }));
  };

  const handleCheckout = async () => {
    if (cart.cartItems.length === 0) {
      alert("Cannot checkout with an empty cart.");
      return;
    }

    try {
      await deleteCart({ id });
      alert("You are now being redirected to checkout!");
      navigate("/checkout-confirmation");
    } catch (error) {
      console.log("Checkout error", error);
      alert("Unable to proceed to checkout.");
    }
  };

  const removeCartItem = async (event, id) => {
    event.preventDefault();
    try {
      const response = await deleteCartItem({ id }).unwrap();
      alert("Product removed from from your cart!");
    } catch (error) {
      console.log("Product remove error");
      alert("Failed to remove product.");
    }
  };

  return (
    <div>
      {isSuccess &&
        cart.cartItems.map((item) => (
          <div className="product" key={item.id}>
            <CartItem productId={item.productsId} />
            <form
              onSubmit={(event) => handleSubmit(event, item.id)}
              className="form"
            >
              <div className="form-row align-items-center">
                <div className="col-auto my-1">
                  <label
                    className="mr-sm-2 sr-only"
                    htmlFor={`quantity-select-${item.id}`}
                  >
                    Quantity:
                  </label>
                  <select
                    className="custom-select mr-sm-2"
                    id={`quantity-select-${item.id}`}
                    onChange={(e) => handleSelectChange(e, item.id)}
                    value={quantities[item.id] || item.quantity}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="col-auto my-1">
                  <button type="submit" className="btn btn-primary">
                    Update Quantity
                  </button>
                  <button
                    onClick={(event) => removeCartItem(event, item.id)}
                    className="btn btn-primary"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </form>
          </div>
        ))}
      <div className="checkout-button">
        <button className="btn btn-success" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
