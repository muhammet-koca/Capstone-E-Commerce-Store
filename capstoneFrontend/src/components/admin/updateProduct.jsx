import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateProductMutation } from "./adminSlice";
import { useGetProductByIdQuery } from "../home/homeSlice";

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
        navigate("/");
      }
    } catch (error) {
      console.log("Update Product error");
    }
  };

  return (
    <div>
      <h1>
        Update Product: {product ? `${product.productName}` : "Loading..."}
      </h1>
      <form onSubmit={handleProduct}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            name="productName"
            value={form.productName}
            onChange={update}
            type="text"
            className="form-control"
            placeholder="Product Name"
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            name="image"
            value={form.image}
            onChange={update}
            type="text"
            className="form-control"
            placeholder="Image"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            name="price"
            value={form.price}
            onChange={update}
            type="float"
            className="form-control"
            placeholder="Price"
          />
        </div>
        <div className="form-group">
          <label>Publish</label>
          <input
            name="publish"
            value={form.publish}
            onChange={update}
            type="boolean"
            className="form-control"
            placeholder="Publish"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
}
