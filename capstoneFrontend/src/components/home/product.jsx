import { useGetProductByIdQuery } from "./homeSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../app/api";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  //   const navigate = useNavigate();
  const getProductById = useGetProductByIdQuery({ id });

  // const [checkoutBook] = useCheckoutBookMutation();

  const getSingleProduct = async (id) => {
    try {
      getProductById(id);
      setSingleProduct();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // const handleCheckout = async () => {
  //   try {
  //     await checkoutBook(id);
  //     alert("Book checked out successfully!");
  //   } catch (error) {
  //     alert("Failed to checkout.");
  //   }
  // };

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
