const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { translate, getHistory, improve, explain } = require("../controllers/translateController");

// TRANSLATE API
router.post("/translate", auth, translate);

// TRANSLATION HISTORY (Protected)
router.get("/translate/history", auth, getHistory);

// AI TUTOR - Improve sentence
router.post("/translate/improve", improve);

// AI TUTOR - Explain meaning (word breakdown)
router.post("/translate/explain", explain);

module.exports = router;
