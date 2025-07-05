const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/authMiddleware");

// 📌 Create Tender
router.post("/", verifyToken, async (req, res) => {
  const { title, description, budget, deadline } = req.body;

  try {
    const newTender = await pool.query(
      "INSERT INTO tenders (user_id, title, description, budget, deadline) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user.id, title, description, budget, deadline]
    );

    res.status(201).json(newTender.rows[0]);
  } catch (err) {
    console.error("Tender creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Get All Tenders by This Company
router.get("/", verifyToken, async (req, res) => {
  try {
    const tenders = await pool.query(
      "SELECT * FROM tenders WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.status(200).json(tenders.rows);
  } catch (err) {
    console.error("Fetch tenders error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATE TENDER
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, budget, deadline } = req.body;
  const { id } = req.params;

  try {
    const updated = await pool.query(
      "UPDATE tenders SET title=$1, description=$2, budget=$3, deadline=$4 WHERE id=$5 AND user_id=$6 RETURNING *",
      [title, description, budget, deadline, id, req.user.id]
    );

    if (updated.rowCount === 0) {
      return res.status(403).json({ message: "Unauthorized or tender not found" });
    }

    res.status(200).json(updated.rows[0]);
  } catch (err) {
    console.error("Tender update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE TENDER
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await pool.query(
      "DELETE FROM tenders WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );

    if (deleted.rowCount === 0) {
      return res.status(403).json({ message: "Unauthorized or tender not found" });
    }

    res.status(200).json({ message: "Tender deleted" });
  } catch (err) {
    console.error("Tender delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 View proposals for a specific tender
router.get("/:id/proposals", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const proposals = await pool.query(
      `SELECT p.*, u.email AS applicant_email
       FROM proposals p
       JOIN users u ON p.user_id = u.id
       WHERE p.tender_id = $1`,
      [id]
    );

    res.status(200).json(proposals.rows);
  } catch (err) {
    console.error("Fetch proposals error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Accept or Reject Proposal
router.put("/proposals/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    // First check if the proposal exists and belongs to the current user's tender
    const proposalCheck = await pool.query(`
      SELECT p.*, t.user_id as tender_owner
      FROM proposals p
      JOIN tenders t ON p.tender_id = t.id
      WHERE p.id = $1
    `, [id]);

    if (proposalCheck.rows.length === 0) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    if (proposalCheck.rows[0].tender_owner !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this proposal" });
    }

    const updated = await pool.query(
      `UPDATE proposals SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    res.status(200).json(updated.rows[0]);
  } catch (err) {
    console.error("Update proposal status error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ EXPORT AT END!
module.exports = router;
