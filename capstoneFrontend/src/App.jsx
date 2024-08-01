import React from "react";
import Login from "./components/login/login";
import Protected from "./components/home/protected";
import Update from "./components/features/update";
import SingleProduct from "./components/home/product";
import Home from "./components/home/home";
import Register from "./components/register/register";
import Cart from "./components/cart/cart";
import { useState } from "react";
import Navigation from "./components/home/Navigation";
import AddProduct from "./components/admin/addProduct";
import UpdateProduct from "./components/admin/updateProduct";
import GetUsers from "./components/admin/adminUsers";
import SingleUser from "./components/admin/singleUser";
import PromoteUser from "./components/admin/promoteUser";
import CheckoutConfirmation from "./components/cart/checkoutConfirmation";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//update routes for current site

function App() {
  const [email, setEmail] = useState();
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route
            path="/checkout-confirmation"
            element={<CheckoutConfirmation />}
          />
          <Route path="/login" element={<Login setEmail={setEmail} />} />
          <Route path="/register" element={<Register setEmail={setEmail} />} />
          <Route element={<Protected />}>
            <Route path="/getCart/:id" element={<Cart />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/product/" element={<AddProduct />} />
            <Route path="/users/" element={<GetUsers />} />
            <Route path="/user/:id" element={<SingleUser />} />
            <Route path="/updateProduct/:id" element={<UpdateProduct />} />
            <Route path="/update/user/:id" element={<PromoteUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
