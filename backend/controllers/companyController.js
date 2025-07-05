const pool = require("../db");

// 📌 CREATE Company
exports.createCompany = async (req, res) => {
  const { name, industry, description } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "INSERT INTO companies (user_id, name, industry, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, name, industry, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Create company error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 GET Company (by user)
exports.getCompany = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM companies WHERE user_id = $1",
      [userId]
    );

     if (result.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Get company error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 UPDATE Company
exports.updateCompany = async (req, res) => {
  const userId = req.user.id;
  const { name, industry, description } = req.body;

  try {
    const result = await pool.query(
      "UPDATE companies SET name = $1, industry = $2, description = $3 WHERE user_id = $4 RETURNING *",
      [name, industry, description, userId]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Update company error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 DELETE Company
exports.deleteCompany = async (req, res) => {
  const userId = req.user.id;

  try {
    await pool.query("DELETE FROM companies WHERE user_id = $1", [userId]);
    res.status(200).json({ message: "Company deleted" });
  } catch (err) {
    console.error("Delete company error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
