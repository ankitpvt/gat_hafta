import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import '../style/Login.css';
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/admin/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      
      <input
        type="text"
        placeholder="Username"
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="login-btn">
        Login
      </button>

      <p className="signup-text">
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")} className="signup-btn">
          Sign Up
        </button>
      </p>
      <div>
      <Link to="/">
              <button className="btn home-btn">Go To Home</button>
            </Link>
          </div>
    </div>
  );
};

export default Login;
