import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtected = ({ isAdmin }) => {
  //   const token = useSelector(
  //     (state) => state.login.token || state.register.token
  //   );
  const sessionIsAdmin = window.sessionStorage.getItem("isAdmin");
  //   const userRole = useSelector((state) => state.user.isAdmin);

  if (sessionIsAdmin === "false" || isAdmin === "false") {
    return alert("Not admin");
  }

  if (sessionIsAdmin === "true" || isAdmin === "true") {
    return console.log("it works");
  }
  return <Outlet />;
};
export default AdminProtected;
