import React, { useState } from "react";
 import '../style/LoanCalculation.css';
import { Link } from "react-router-dom";
const LoanCalculation = () => {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [months, setMonths] = useState("");
  const [monthlyInterest, setMonthlyInterest] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  const calculateLoan = () => {
    if (!amount || !interest || !months) {
      alert("कृपया सर्व माहिती भरा!");
      return;
    }

    const principal = parseFloat(amount);
    const rate = parseFloat(interest) / 100;
    const duration = parseInt(months);

    const interestAmount = principal * rate * duration;
    const totalAmount = principal + interestAmount;

    setMonthlyInterest((interestAmount / duration).toFixed(2));
    setTotalPayable(totalAmount.toFixed(2));
  };

  return (
    <div className="loan-container">
      <h1 className="loan-title">**कर्ज कॅल्क्युलेटर**</h1>
      
      <div className="loan-form">
        <input
          type="number"
          placeholder="कर्जाची रक्कम (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="loan-input"
        />
        <input
          type="number"
          placeholder="व्याजदर (%)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="loan-input"
        />
        <input
          type="number"
          placeholder="कालावधी (महिने)"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="loan-input"
        />
        <button onClick={calculateLoan} className="loan-btn">
        गणना करा
        </button>
      </div>

      {totalPayable > 0 && (
        <div className="loan-result">
          <h3>Results</h3>
          <p>📌मासिक व्याज: ₹{monthlyInterest}</p>
          <p>💰 एकूण भरायची रक्कम: ₹{totalPayable}</p>
        </div>
      )}
      <Link to="/">
              <button style={{ marginTop: "20px" }}>Go to Home</button>
            </Link>
    </div>
  );
};

export default LoanCalculation;
