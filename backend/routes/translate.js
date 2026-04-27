const express = require("express");
const router = express.Router();

// TEMP TRANSLATE API (dummy for now)
router.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    // dummy response (for testing)
    res.json({
      original: text,
      translated: "This is a translated version (dummy)",
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
