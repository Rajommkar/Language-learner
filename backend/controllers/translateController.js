const axios = require("axios");
const Translation = require("../models/Translation");

// In-memory cache (key: text, value: { translated, timestamp })
const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const CACHE_MAX_SIZE = 500;

// TRANSLATE (with caching + save to DB)
const translate = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const cacheKey = text.trim().toLowerCase();

    // 1. Check in-memory cache first (fastest)
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return res.json({
          original: text,
          translated: cached.translated,
          source: "cache"
        });
      }
      cache.delete(cacheKey); // expired
    }

    // 2. Check DB cache (if same text was translated before)
    const existing = await Translation.findOne({
      originalText: { $regex: new RegExp(`^${cacheKey}$`, "i") }
    });

    if (existing) {
      // store in memory cache for next time
      if (cache.size >= CACHE_MAX_SIZE) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      cache.set(cacheKey, {
        translated: existing.translatedText,
        timestamp: Date.now()
      });

      return res.json({
        original: text,
        translated: existing.translatedText,
        source: "database"
      });
    }

    // 3. Call external API (last resort)
    const response = await axios.post(process.env.TRANSLATE_API_URL, {
      q: text,
      source: "auto",
      target: "en",
      format: "text"
    });

    const translatedText = response.data.translatedText;

    // save to DB
    const translation = new Translation({
      userId: req.user ? req.user.id : null,
      originalText: text,
      translatedText: translatedText,
      sourceLanguage: "auto",
      targetLanguage: "en",
    });

    await translation.save();

    // save to memory cache
    if (cache.size >= CACHE_MAX_SIZE) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    cache.set(cacheKey, {
      translated: translatedText,
      timestamp: Date.now()
    });

    res.json({
      original: text,
      translated: translatedText,
      source: "api"
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

// IMPROVE SENTENCE (AI Tutor)
const improve = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    // Translate to English first to get proper form
    const response = await axios.post(process.env.TRANSLATE_API_URL, {
      q: text,
      source: "auto",
      target: "en",
      format: "text"
    });

    const translated = response.data.translatedText;

    // Build improvement suggestions
    const suggestions = {
      original: text,
      improved: translated,
      tips: []
    };

    // Basic analysis
    if (text.length < 5) {
      suggestions.tips.push("Try writing longer sentences for better practice");
    }
    if (text === text.toLowerCase()) {
      suggestions.tips.push("Remember to capitalize the first letter of sentences");
    }
    if (!text.match(/[.!?]$/)) {
      suggestions.tips.push("Add punctuation at the end of your sentence");
    }
    if (text.split(" ").length < 3) {
      suggestions.tips.push("Try forming complete sentences with subject + verb + object");
    }

    res.json(suggestions);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Improvement analysis failed" });
  }
};

// EXPLAIN MEANING (AI Tutor)
const explain = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    // Translate word/phrase
    const response = await axios.post(process.env.TRANSLATE_API_URL, {
      q: text,
      source: "auto",
      target: "en",
      format: "text"
    });

    const translated = response.data.translatedText;

    // Build explanation
    const words = text.trim().split(" ");
    const wordBreakdown = [];

    // Translate each word individually for breakdown
    for (const word of words.slice(0, 10)) { // limit to 10 words
      try {
        const wordRes = await axios.post(process.env.TRANSLATE_API_URL, {
          q: word,
          source: "auto",
          target: "en",
          format: "text"
        });
        wordBreakdown.push({
          original: word,
          meaning: wordRes.data.translatedText
        });
      } catch {
        wordBreakdown.push({
          original: word,
          meaning: "—"
        });
      }
    }

    res.json({
      original: text,
      fullMeaning: translated,
      wordCount: words.length,
      wordBreakdown: wordBreakdown
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Explanation failed" });
  }
};

module.exports = { translate, getHistory, improve, explain };
