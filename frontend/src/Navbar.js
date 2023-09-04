import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  let auth = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="navbar">
      {auth ? <img src="/images/logo.png" alt="logo" className="logo" /> : ""}
      <ul>
        {auth ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-product">Add Product</Link>
            </li>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/">Services</Link>
            </li>
            <li>
              <NavLink onClick={logout} to="/signup">
                Logout ({auth?.message?.name})
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
