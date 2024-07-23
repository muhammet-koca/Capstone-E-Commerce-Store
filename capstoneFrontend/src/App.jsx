import Login from "./components/login/login";
import Protected from "./components/home/protected";
import UpdateUser from "./components/features/update";
import Home from "./components/home/home";
import Registration from "./components/register/register";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//update routes for current site

function App() {
  const [email, setEmail] = useState();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login setEmail={setEmail} />} />
          <Route
            path="/register"
            element={<Registration setEmail={setEmail} />}
          />
          <Route element={<Protected />}>
            <Route path="/home" element={<Home email={email} />} />
            <Route path="/update/:id" element={<UpdateUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
