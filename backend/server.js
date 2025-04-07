require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require('path');




const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const _dirname = path.resolve();

const corsOptions = {
    origin: 'https://gat-hafta.onrender.com', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies to be sent
  };
  
  // Use CORS middleware with the specified options
  app.use(cors(corsOptions));
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));
  
  // Models
  const UserSchema = new mongoose.Schema({ name: String });
  
  const remainSchema = new mongoose.Schema({totals : Number, remain : Number, date : Date});
  
  const LoanSchema = new mongoose.Schema({
    user: String, // Stores the name of the user
    amount: Number,
    interest: Number,
    startDate: Date,
  });
  
  const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
  
  const User = mongoose.model("User", UserSchema);
  const Loan = mongoose.model("Loan", LoanSchema);
  const Admin = mongoose.model("Admin", AdminSchema);
  const Total = mongoose.model("Total", remainSchema);
  
  // 🛡️ Admin Authentication Routes
  app.post("/admin/register", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Allow only one admin
      const existingAdmin = await Admin.findOne();
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = new Admin({ username, password: hashedPassword });
      await admin.save();
      res.json({ message: "✅ Admin registered successfully" });
    } catch (error) {
      console.error("❌ Error registering admin:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username });
  
      if (!admin) return res.status(400).json({ message: "Username किंवा Password चुकीचा आहे" });
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: "Username किंवा Password चुकीचा आहे" });
  
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (error) {
      console.error("❌ Error during admin login:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // 👤 Users API
  app.post("/users", async (req, res) => {
    try {
      const { name } = req.body;
      const user = new User({ name });
      await user.save();
      res.json(user);
    } catch (error) {
      console.error("❌ Error creating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/users", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // 💰 Loans API
  app.post("/loans", async (req, res) => {
    try {
      const { user, amount, interest, startDate } = req.body;
  
      if (!user || !amount || !interest || !startDate) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const loan = new Loan({ user, amount, interest, startDate });
      await loan.save();
      res.json(loan);
    } catch (error) {
      console.error("❌ Error adding loan:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/loans", async (req, res) => {
    try {
      const loans = await Loan.find();
      res.json(loans);
    } catch (error) {
      console.error("❌ Error fetching loans:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.delete("/loans/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedLoan = await Loan.findByIdAndDelete(id);
  
      if (!deletedLoan) {
        return res.status(404).json({ message: "Loan record not found" });
      }
  
      res.json({ message: "✅ Loan record deleted successfully" });
    } catch (error) {
      console.error("❌ Error deleting loan record:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  
  app.post("/total", async (req, res) => {
      try {
        const { totals, remain, date } = req.body;
        const total = new Total({totals, remain, date});
        await total.save();
        res.json(total);
      } catch (error) {
        console.error("❌ Error creating user:", error);
        res.status(500).json({ message: "Server error" });
      }
    });
  
    app.get("/total", async (req, res) => {
      try {
        const total = await Total.find();
        res.json(total);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
      }
    });
  
    app.delete("/total/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const deletedTotal = await Total.findByIdAndDelete(id);
    
        if (!deletedTotal) {
          return res.status(404).json({ message: "Loan record not found" });
        }
    
        res.json({ message: "✅ Loan record deleted successfully" });
      } catch (error) {
        console.error("❌ Error deleting loan record:", error);
        res.status(500).json({ message: "Server error" });
      }
    });
  



  
  app.use(express.static(path.join(_dirname, "/frontend/build")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
