import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 import '../style/AdminDashboard.css';
const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await axios.get("http://localhost:5000/loans");
      setLoans(res.data);
    } catch (err) {
      console.error("Error fetching loans:", err.response?.data || err.message);
    }
  };

  const addLoan = async () => {
    if (!user || !amount || !interest || !startDate) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/loans", {
        user,
        amount: parseFloat(amount),
        interest: parseFloat(interest),
        startDate,
      });

      setLoans([...loans, res.data]);
      setUser("");
      setAmount("");
      setInterest("");
      setStartDate("");
    } catch (err) {
      console.error("Error adding loan:", err.response?.data || err.message);
    }
  };

  const deleteLoan = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/loans/${id}`);
      setLoans(loans.filter((loan) => loan._id !== id));
    } catch (err) {
      console.error("Error deleting loan:", err.response?.data || err.message);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <h2 className="section-heading">Add Loan</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="User Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Loan Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Interest (%)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="input"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input"
        />
        <button onClick={addLoan} className="btn add-btn">
          Add Loan
        </button>
      </div>

      <h2 className="section-heading">Loan Records</h2>
      <table className="loan-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Loan Amount</th>
            <th>Interest (%)</th>
            <th>Date of Loan Given</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td>{loan.user}</td>
              <td>₹{loan.amount}</td>
              <td>{loan.interest}%</td>
              <td>{new Date(loan.startDate).toLocaleDateString("en-GB")}</td>
              <td>
                <button onClick={() => deleteLoan(loan._id)} className="btn delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/">
        <button className="btn home-btn">Go To Home</button>
      </Link>
    </div>
  );
};

export default AdminDashboard;
