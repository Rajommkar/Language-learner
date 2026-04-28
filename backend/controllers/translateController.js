const axios = require("axios");
const Translation = require("../models/Translation");

// TRANSLATE (and save to DB)
const translate = async (req, res) => {
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

    const translatedText = response.data.translatedText;

    // save translation to DB
    const translation = new Translation({
      userId: req.user ? req.user.id : null,
      originalText: text,
      translatedText: translatedText,
      sourceLanguage: "auto",
      targetLanguage: "en",
    });

    await translation.save();

    res.json({
      original: text,
      translated: translatedText
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Translation failed" });
  }
};

// GET TRANSLATION HISTORY (Protected)
const getHistory = async (req, res) => {
  try {
    const translations = await Translation.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(translations);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

module.exports = { translate, getHistory };
