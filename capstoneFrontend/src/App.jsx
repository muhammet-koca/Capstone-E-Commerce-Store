import Login from "./components/login/login";
import Protected from "./components/home/protected";
import Update from "./components/features/update";
import SingleProduct from "./components/home/product";
import Home from "./components/home/home";
import Register from "./components/register/register";
import Cart from "./components/cart/cart";
import { useState } from "react";
import Navigation from "./components/home/Navigation";

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
          <Route path="/login" element={<Login setEmail={setEmail} />} />
          <Route path="/register" element={<Register setEmail={setEmail} />} />
          <Route element={<Protected />}>
            <Route path="/getCart/:id" element={<Cart />} />
            {/* <Route path="/home" element={<Home email={email} />} /> */}
            <Route path="/update/:id" element={<Update />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
