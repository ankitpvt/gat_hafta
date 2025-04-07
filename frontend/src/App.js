import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import SignUp from "./pages/SignUp";
import LoanCalculation from "./pages/LoanCalculation";
import Total from "./pages/Total";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/loan-calculator" element={<LoanCalculation />} />
        <Route path="/total" element={<Total/>}/>
      </Routes>
    </Router>
  );
}

export default App;
