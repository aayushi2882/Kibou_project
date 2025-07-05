const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const companyController = require("../controllers/companyController");

router.post("/", verifyToken, companyController.createCompany);
router.get("/", verifyToken, companyController.getCompany);
router.put("/", verifyToken, companyController.updateCompany);
router.delete("/", verifyToken, companyController.deleteCompany);

module.exports = router;
