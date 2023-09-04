import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      navigate("/");
    }
  }, []);
  function Register(event) {
    axios
      .post("http://localhost:5500/register", { name, email, password })
      .then((res) => {
        console.log('response',res)
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("auth", JSON.stringify(res.data.auth));
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  }
  return (
    <div className="registrationForm">
      <h1>Registration form</h1>
      <form>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="pasword"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" onClick={Register}>
          Signup
        </button>
      </form>
    </div>
  );
}
