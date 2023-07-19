import axios from "axios";
import React, { useState } from "react";
import "./SignUp.css";
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function Register(event) {
    console.log(name, email, password);
    axios
      .post("http://localhost:5500/register", { name, email, password })
      .then((res) => {
        console.log(res);
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
