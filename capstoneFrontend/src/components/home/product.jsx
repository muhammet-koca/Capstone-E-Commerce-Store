import React from "react";
import { useGetProductByIdQuery } from "./homeSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAddToCartMutation } from "../cart/cartSlice";
import { useDeleteProductMutation } from "../admin/adminSlice";
import "./product.css";

const SingleProduct = () => {
  const { id } = useParams();
  const {
    data: singleProduct,
    isSuccess,
    isLoading,
  } = useGetProductByIdQuery(id);
  const [addToCart] = useAddToCartMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const sessionCart = window.sessionStorage.getItem("Cart");
  const sessionIsAdmin = window.sessionStorage.getItem("isAdmin");

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
      await addToCart({ id, sessionCart });
      alert("Added to Cart");
    } catch (error) {
      console.log("Failed to add to cart", error);
    }
  };

  const handleDeleteProduct = async (event, id) => {
    event.preventDefault();
    try {
      const response = await deleteProduct({ id });
      alert("Product deleted!");
      navigate("/");
    } catch (error) {
      console.log("Delete Product error");
    }
  };

  if (sessionIsAdmin === "true") {
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

          <button
            className="back-button"
            type="button"
            onClick={() => navigate(`/updateProduct/${id}`)}
          >
            Update Product
          </button>
          <button
            onClick={(event) => handleDeleteProduct(event, id)}
            className="btn btn-primary"
          >
            Delete Product
          </button>
        </div>
      </div>
    );
  } else {
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
  }
};
export default SingleProduct;
