const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

// 📌 SIGNUP
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("📥 Received signup request:", email);

    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    console.log("👀 Checked if user exists");

    if (userExists.rows.length > 0) {
      console.log("❌ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🔐 Password hashed");

    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );
    console.log("✅ New user inserted");

    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("🔑 Token generated");

    res.status(201).json({ message: "User registered", token });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔐 Login attempt for:", email);

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      console.log("❌ No user found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login successful");
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
