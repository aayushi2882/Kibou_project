const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

// 🛡 Protected Route Example
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected data accessed!", user: req.user });
});

module.exports = router;
