import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function loginForm(event) {
    axios
      .post("http://localhost:5500/login", { email, password })
      .then((res) => {
        console.log(res);
        setEmail("");
        setPassword("");
      });
    event.preventDefault();
  }
  return (
    <div className="login">
      <form>
        <label>Email</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <br />
        <button type="submit" onClick={loginForm}>
          Login
        </button>
      </form>
    </div>
  );
}
