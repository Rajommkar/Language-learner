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

module.exports = { translate, getHistory };
