// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDeleteCartMutation } from "./cartSlice";

// export default function Checkout() {
//   const { id: cartId } = useParams();
//   const [deleteCart] = useDeleteCartMutation();
//   const navigate = useNavigate();

//   const handleCheckout = async () => {
//     try {
//       await deleteCart({ id: cartId }).unwrap();
//       console.log("Checkout successful");
//       navigate("/");
//     } catch (error) {
//       console.log("Checkout error", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Checkout</h2>
//       <button className="btn btn-success" onClick={handleCheckout}>
//         Proceed to Checkout
//       </button>
//     </div>
//   );
// }
