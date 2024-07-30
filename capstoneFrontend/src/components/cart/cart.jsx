import {
  useGetCartQuery,
  useUpdateCartMutation,
  useCreateCartMutation,
  useDeleteCartMutation,
  useDeleteCartItemMutation,
} from "./cartSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: cart = [], isSuccess, isLoading } = useGetCartQuery({ id });
  const [updateCart] = useUpdateCartMutation();
  const createCart = useCreateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  // const [cartItem, setCartItem] = useState({ id: null, quantity: 1 });
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
    } catch (error) {
      console.log("Update cart error", error);
    }
  };

  const handleSelectChange = (event, cartItemId) => {
    setQuantities((prev) => ({
      ...prev,
      [cartItemId]: Number(event.target.value),
    }));
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
        cart.cartItems.map((item) => (
          <div className="product" key={item.id}>
            <p>
              <Link to={`/product/cartitem/${item.id}`}>
                {item.productName}
              </Link>
            </p>
            <form onSubmit={(event) => handleSubmit(event, item.id)}>
              <div className="form-row align-items-center">
                <div className="col-auto my-1">
                  <label
                    className="mr-sm-2 sr-only"
                    htmlFor={`quantity-select-${item.id}`}
                  >
                    Quantity
                  </label>
                  <select
                    className="custom-select mr-sm-2"
                    id={`quantity-select-${item.id}`}
                    onChange={(e) => handleSelectChange(e, item.id)}
                    value={quantities[item.id] || 1}
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
