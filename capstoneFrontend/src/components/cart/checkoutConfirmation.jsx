import React from "react";
import { Link } from "react-router-dom";
import "./checkoutConfirmation.css";
const CheckoutConfirmation = () => {
  return (
    <div className="checkout-confirmation">
      <h3>Thank you for your purchase!</h3>
      <p>Your order has been successfully processed.</p>
      <Link to="/" className="button-home">
        Return to Home
      </Link>
    </div>
  );
};

export default CheckoutConfirmation;
