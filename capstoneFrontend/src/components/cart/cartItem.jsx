import { useUpdateCartMutation } from "./";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../app/api";

const SingleProduct = () => {
  const { id } = useParams();
  const {
    data: singleProduct,
    isSuccess,
    isLoading,
  } = useGetProductByIdQuery(id);

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

  return (
    <div>
      <h1>{singleProduct.productName}</h1>
      <p>Price: {singleProduct.price}</p>
      <img
        className="img"
        src={singleProduct.image}
        alt={singleProduct.productName}
      />
      {/* {" "} */}
      {/* <div>
    //       {token ? (
    //         <button
    //           type="button"
    //           className="btn btn-primary"
    //           id="single-button"
    //           onClick={handleCheckout}
    //         >
    //           Checkout
    //         </button>
    //       ) : (
    //         <p>Please log in to checkout this book.</p>
    //       )}
    //       <button
    //         type="button"
    //         className="btn btn-primary"
    //         id="single-button"
    //         onClick={() => navigate("/")}
    //       >
    //         Back
    //       </button>
    //     </div> */}
    </div>
  );
};

export default SingleProduct;
