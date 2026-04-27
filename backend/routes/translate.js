const express = require("express");
const router = express.Router();
const axios = require("axios");

// REAL TRANSLATE API
router.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    // call Translation API (URL from .env for easy swapping)
    const response = await axios.post(process.env.TRANSLATE_API_URL, {
      q: text,
      source: "auto",
      target: "en",
      format: "text"
    });

    res.json({
      original: text,
      translated: response.data.translatedText
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Translation failed" });
  }
});

module.exports = router;
