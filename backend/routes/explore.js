const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/authMiddleware");

// 🔍 GET: Explore all tenders (excluding your own)
router.get("/tenders", verifyToken, async (req, res) => {
  try {
    const tenders = await pool.query(
      `
     SELECT t.*, c.name AS company_name, c.logo_url
FROM tenders t
JOIN (
  SELECT DISTINCT ON (user_id) *
  FROM companies
  ORDER BY user_id, id DESC
) c ON t.user_id = c.user_id
WHERE t.user_id != $1
ORDER BY t.created_at DESC
      `,
      [req.user.id]
    );
    res.status(200).json(tenders.rows);
  } catch (err) {
    console.error("Explore tenders error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📤 POST: Propose to a tender
router.post("/propose/:id", verifyToken, async (req, res) => {
  const { proposalText } = req.body;
  const tenderId = req.params.id;

  try {
    const existingProposal = await pool.query(
      "SELECT * FROM proposals WHERE user_id=$1 AND tender_id=$2",
      [req.user.id, tenderId]
    );

    if (existingProposal.rows.length > 0) {
      return res.status(400).json({ message: "You’ve already proposed to this tender." });
    }

    const newProposal = await pool.query(
      `
      INSERT INTO proposals (user_id, tender_id, proposal_text)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [req.user.id, tenderId, proposalText]
    );

    res.status(201).json({ message: "Proposal submitted", proposal: newProposal.rows[0] });
  } catch (err) {
    console.error("Proposal error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
