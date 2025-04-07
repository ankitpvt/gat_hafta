import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import '../style/Home.css';

const Home = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://gat-hafta.onrender.com/loans")
      .then((res) => setLoans(res.data))
      .catch((err) => console.error(err));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${
      (date.getMonth() + 1).toString().padStart(2, "0")
    }/${date.getFullYear()}`;
  };

  return (
    <div className="home-container">
      <h1 className="home-title">बजरंग चौक हप्त्यामध्ये आपले स्वागत आहे</h1>
      <p className="home-subtitle">
      10 तारखेच्या गट.
      </p>

      <div className="button-group">
        
        <Link to="/loan-calculator">
          <button className="btn">कर्ज कॅल्क्युलेटर</button>
        </Link>
        <Link to="/total">
          <button className="btn">एकूण उरलेली रक्कम</button>
        </Link>
        <button className="btn" onClick={() => navigate("/login")}>
          Admin Login
        </button>
      </div>

      <h2 className="record-heading">कर्ज नोंदी</h2>

      <table className="loan-table">
        <thead>
          <tr>
            <th>नाव</th>
            <th>कर्जाची रक्कम</th>
            <th> व्याज (%)</th>
            <th> कर्ज दिल्याची तारीख</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <tr key={index}>
              <td>{loan.user}</td>
              <td>₹{loan.amount}</td>
              <td>{loan.interest}%</td>
              <td>{formatDate(loan.startDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
