import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Footer from "./Footer";
import Login from "./Login";
import Navbar from "./Navbar";
import PrivateComponent from "./PrivateComponent";
import SignUp from "./SignUp";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <App />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<h1>Hello Home</h1>} />
          <Route path="add" element={<h1>Hello Add</h1>} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
