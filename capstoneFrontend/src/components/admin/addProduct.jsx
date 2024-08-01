import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProductMutation } from "./adminSlice";

export default function AddProduct() {
  const [createProduct] = useProductMutation();
  const navigate = useNavigate();

  const state = useSelector((state) => state);

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

  const submit = async (e) => {
    e.preventDefault();
    try {
      let response = false;

      response = await createProduct(form).unwrap();
      console.log("createProduct:", response);
      const responseJson = JSON.parse(response);
      console.log(responseJson);

      if (response) {
        alert("Product added!");
        navigate("/");
      }
    } catch (error) {
      console.log(error, "Add Product error");
      alert("Failed to add product.");
    }
  };

  return (
    <div>
      <form onSubmit={submit} className="form">
        <div>
          <label>*Product Name:</label>
          <input
            name="productName"
            value={form.productName}
            onChange={update}
            type="text"
            className="input"
            placeholder="Product Name"
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            name="image"
            value={form.image}
            onChange={update}
            type="text"
            className="input"
            placeholder="Image"
          />
        </div>
        <div>
          <label>*Price:</label>
          <input
            name="price"
            value={form.price}
            onChange={update}
            type="number"
            className="input"
            placeholder="Price"
            required
          />
        </div>
        <div>
          <label>Publish:</label>
          <input
            name="publish"
            value={form.publish}
            onChange={update}
            type="text"
            className="input"
            placeholder="Publish"
          />
        </div>
        <p>* Indicates a required field.</p>
        <button type="submit" className="button-confirm">
          Add Product
        </button>
      </form>
    </div>
  );
}
