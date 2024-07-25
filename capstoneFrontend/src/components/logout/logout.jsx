import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // const sessionToken = window.sessionStorage.getItem("Token");
      // sessionStorage.clear(sessionToken);

      sessionStorage.removeItem("Token");

      alert("Logged Out!");

      navigate("/");
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

// export const { Logout } = logoutUser;
