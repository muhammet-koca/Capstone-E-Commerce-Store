import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateProductMutation } from "./adminSlice";
import { useGetProductByIdQuery } from "../home/homeSlice";
import React from "react";
import "../home/home.css";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product } = useGetProductByIdQuery(id);

  useEffect(() => {
    console.log("Product ID:", id);
  }, [id]);

  const [updateProduct] = useUpdateProductMutation();

  const [form, setForm] = useState({
    productName: "",
    image: "",
    price: "",
    publish: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName || "",
        image: product.image || "",
        price: product.price || "",
        publish: "",
      });
    }
  }, [product]);

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProduct = async (event) => {
    event.preventDefault();
    try {
      const response = await updateProduct({ id, form });
      if (response) {
        alert("Product updated!");
        navigate("/");
      }
    } catch (error) {
      console.log("Update Product error");
      alert("Failed to update product.");
    }
  };

  return (
    <div>
      <h1>
        Update Product: {product ? `${product.productName}` : "Loading..."}
      </h1>
      <form onSubmit={handleProduct} className="form">
          <label>*Product Name</label>
          <input
            name="productName"
            value={form.productName}
            onChange={update}
            type="text"
            className="input"
            placeholder="Product Name"
            required
          />
          <label>Image</label>
          <input
            name="image"
            value={form.image}
            onChange={update}
            type="text"
            className="input"
            placeholder="Image"
          />
        
          <label>*Price</label>
          <input
            name="price"
            value={form.price}
            onChange={update}
            type="float"
            className="input"
            placeholder="Price"
            required
          />
        

        <label>Publish</label>
        <input
          name="publish"
          value={form.publish}
          onChange={update}
          type="boolean"
          className="input"
          placeholder="Publish"
        />

        <p>* Indicates a required field.</p>
        <button type="submit" className="button-confirm">
          Update Product
        </button>
      </form>
    </div>
  );
}
