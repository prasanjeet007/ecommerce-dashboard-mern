import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      navigate("/");
    }
  }, []);
  function loginForm(event) {
    axios
      .post("http://localhost:5500/login", { email, password })
      .then((res) => {
        setEmail("");
        setPassword("");
        if (res.data.statusCode === 404) {
          alert("Please enter correct crendentials");
        } else if (res.data.statusCode === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.message));
          navigate("/");
        }
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
