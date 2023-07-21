import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/signup");
    localStorage.clear();
  };
  let auth = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add Product</Link>
        </li>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/">Services</Link>
        </li>
        {auth ? (
          <li>
            <NavLink onClick={logout} to="/signup">
              Logout
            </NavLink>
          </li>
        ) : (
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
