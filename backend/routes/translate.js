const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { translate, getHistory, improve, explain } = require("../controllers/translateController");

// TRANSLATE API
router.post("/translate", auth, translate);

const Translation = require("../models/Translation");

// TRANSLATION HISTORY (Protected)
router.get("/translate/history", auth, async (req, res) => {
  try {
    const history = await Translation.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history" });
  }
});

// AI TUTOR - Improve sentence
router.post("/translate/improve", improve);

// AI TUTOR - Explain meaning (word breakdown)
router.post("/translate/explain", explain);

module.exports = router;
