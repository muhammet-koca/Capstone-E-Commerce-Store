import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProductMutation, useDeleteProductMutation } from "./adminSlice";

export default function AddProduct() {
  const [createProduct] = useProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const state = useSelector((state) => state);
  console.log(state);

  const [form, setForm] = useState({
    productName: "",
    image: "",
    price: "",
    publish: "",
  });

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeleteProduct = async (event, id) => {
    event.preventDefault();
    try {
      const response = await deleteProduct({ id });
    } catch (error) {
      console.log("Delete Product error");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      let response = false;

      response = await createProduct(form).unwrap();
      console.log("createProduct:", response);
      const responseJson = JSON.parse(response);
      console.log(responseJson);

      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error, "Add Product error");
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
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
            type="text"
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
            type="text"
            className="form-control"
            placeholder="Publish"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
        <button
          onClick={(event) => handleDeleteProduct(event)}
          className="btn btn-primary"
        >
          Delete Product
        </button>
      </form>
    </div>
  );
}
