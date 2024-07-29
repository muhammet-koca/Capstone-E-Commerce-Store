import {
  useGetCartQuery,
  useUpdateCartMutation,
  useCreateCartMutation,
  useDeleteCartMutation,
  useDeleteCartItemMutation,
} from "./cartSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const state = useSelector((state) => state);
  // const cartId = state.register.cart || state.login.cart;
  // console.log(cartId);
  const { data: cart = [], isSuccess, isLoading } = useGetCartQuery({ id });
  const [updateCart] = useUpdateCartMutation();
  const createCart = useCreateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [cartItem, setCartItem] = useState({ id: null, quantity: 1 });

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
        form: cartItem,
      }).unwrap();
      console.log(response);
    } catch (error) {
      console.log("Update cart error", error);
    }
  };

  const handleSelectChange = (event, cartItemId) => {
    setCartItem({ id: cartItemId, quantity: Number(event.target.value) });
  };

  const handleCheckout = async () => {
    try {
      await deleteCart({ id });
      navigate("/");
    } catch (error) {
      console.log("Checkout error", error);
    }
  };

  const removeCartItem = async (event, id) => {
    event.preventDefault();
    try {
      const response = await deleteCartItem({ id });
      alert("Product removed");
    } catch (error) {
      console.log("Product remove error");
    }
  };

  return (
    <div>
      {isSuccess &&
        cart.cartItems.map((cartItem) => (
          <div className="product" key={cartItem.id}>
            <p>
              <Link to={`/product/cartitem/${cartItem.id}`}>
                {cartItem.quantity}
              </Link>
            </p>
            <form onSubmit={(event) => handleSubmit(event, cartItem.id)}>
              <div className="form-row align-items-center">
                <div className="col-auto my-1">
                  <label
                    className="mr-sm-2 sr-only"
                    htmlFor="inlineFormCustomSelect"
                  >
                    Quantity
                  </label>
                  <select
                    className="custom-select mr-sm-2"
                    id="inlineFormCustomSelect"
                    onChange={(e) => handleSelectChange(e, cartItem.id)}
                    value={cartItem.quantity}
                  >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-auto my-1">
                  <button type="submit" className="btn btn-primary">
                    Update Quantity
                  </button>
                  <button
                    // onClick={removeCartItem()}
                    onClick={(event) => removeCartItem(event, cartItem.id)}
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
