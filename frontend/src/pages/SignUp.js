import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await axios.post("http://localhost:5000/admin/register", { username, password });
      alert("Admin registered successfully! You can now log in.");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Admin Sign-Up</h2>
      
      <input
        type="text"
        placeholder="Username"
        className="signup-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="signup-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button onClick={handleSignUp} className="signup-submit-btn">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
