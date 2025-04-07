import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 import '../style/Total.css';
const Total = () => {
  const [loanList, setLoanList] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchTotals();
  }, []);

  const fetchTotals = async () => {
    try {
      const res = await axios.get("https://gat-hafta.onrender.com/total");
      setLoanList(res.data);
    } catch (err) {
      console.error("Error fetching totals:", err.response?.data || err.message);
    }
  };

  const addTotal = async () => {
    if (!totalAmount || !remainingAmount || !date) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.post("https://gat-hafta.onrender.com/total", {
        totals: parseFloat(totalAmount),
        remain: parseFloat(remainingAmount),
        date,
      });
      setTotalAmount("");
      setRemainingAmount("");
      setDate("");
      fetchTotals();
    } catch (err) {
      console.error("Error adding total:", err.response?.data || err.message);
    }
  };

  const deleteTotal = async (id) => {
    try {
      await axios.delete(`https://gat-hafta.onrender.com/total/${id}`);
      setLoanList(loanList.filter((loan) => loan._id !== id));
    } catch (err) {
      console.error("Error deleting total:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <h2>Add Total Record</h2>
      <input
        type="number"
        placeholder="Enter total"
        value={totalAmount}
        onChange={(e) => setTotalAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter remaining"
        value={remainingAmount}
        onChange={(e) => setRemainingAmount(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={addTotal} style={{ marginLeft: "10px" }}>
        Add Total
      </button>

      <h2>Total Amount Records</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th> एकूण</th>
            <th> उरलेली रक्कम</th>
            <th> तारीख </th>
            <th>क्रिया</th>
          </tr>
        </thead>
        <tbody>
          {loanList.map((loan) => (
            <tr key={loan._id}>
              <td>₹{loan.totals}</td>
              <td>₹{loan.remain}</td>
              <td>{new Date(loan.date).toLocaleDateString("en-GB")}</td>
              <td>
                <button
                  onClick={() => deleteTotal(loan._id)}
                  style={{ background: "red", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/">
        <button style={{ marginTop: "20px" }}>Go to Home</button>
      </Link>
    </div>
  );
};

export default Total;
