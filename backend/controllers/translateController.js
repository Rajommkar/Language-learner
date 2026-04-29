const { GoogleGenerativeAI } = require("@google/generative-ai");
const Translation = require("../models/Translation");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// In-memory cache (key: text+target, value: { translated, timestamp })
const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const CACHE_MAX_SIZE = 500;

// Helper: add to cache with eviction
function addToCache(key, translated) {
  if (cache.size >= CACHE_MAX_SIZE) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(key, { translated, timestamp: Date.now() });
}

// TRANSLATE (AI-powered with caching + save to DB)
const translate = async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    const target = targetLang || "en";

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const cacheKey = `${text.trim().toLowerCase()}::${target}`;

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
      originalText: { $regex: new RegExp(`^${text.trim()}$`, "i") },
      targetLanguage: target
    });

    if (existing) {
      addToCache(cacheKey, existing.translatedText);
      return res.json({
        original: text,
        translated: existing.translatedText,
        source: "database"
      });
    }

    // 3. Call Gemini AI (last resort)
    const prompt = `Translate the following text to ${target}. Return ONLY the translated text, nothing else. No quotes, no explanation.\n\nText: "${text}"`;

    const result = await model.generateContent(prompt);
    const translatedText = result.response.text().trim();

    // Save to DB
    const translation = new Translation({
      userId: req.user ? req.user.id : null,
      originalText: text,
      translatedText: translatedText,
      sourceLanguage: "auto",
      targetLanguage: target,
    });

    await translation.save();

    // Save to memory cache
    addToCache(cacheKey, translatedText);

    res.json({
      original: text,
      translated: translatedText,
      source: "ai"
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Translation failed. Please try again." });
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

// IMPROVE SENTENCE (AI Tutor — Real AI Analysis)
const improve = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const prompt = `You are an expert language tutor. Analyze the following sentence and return a JSON response (no markdown, no code fences, just raw JSON) with this exact structure:
{
  "original": "the original text",
  "improved": "the grammatically correct and natural version in the same language",
  "translated": "English translation of the improved version",
  "tips": ["tip 1", "tip 2"],
  "grammarScore": 85
}

Rules:
- "improved" should fix grammar, spelling, and make it sound natural
- "tips" should contain 2-4 specific, actionable writing tips
- "grammarScore" should be 0-100 rating of the original text
- If the text is already in English, still improve it and set "translated" to the improved version

Sentence: "${text}"`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Parse AI response
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      // Fallback if AI doesn't return clean JSON
      parsed = {
        original: text,
        improved: responseText,
        translated: responseText,
        tips: ["Keep practicing to improve your writing!"],
        grammarScore: 70
      };
    }

    res.json(parsed);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Improvement analysis failed" });
  }
};

// EXPLAIN MEANING (AI Tutor — Deep Word Breakdown)
const explain = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const prompt = `You are an expert language teacher. Explain the following text in detail. Return a JSON response (no markdown, no code fences, just raw JSON) with this exact structure:
{
  "original": "the original text",
  "fullMeaning": "complete English translation/meaning",
  "language": "detected source language",
  "wordBreakdown": [
    { "original": "word1", "meaning": "English meaning", "partOfSpeech": "noun/verb/etc" },
    { "original": "word2", "meaning": "English meaning", "partOfSpeech": "noun/verb/etc" }
  ],
  "culturalContext": "any cultural or usage context (1-2 sentences)",
  "exampleSentences": ["example sentence using similar structure 1", "example sentence 2"]
}

Rules:
- Break down EVERY word (max 15 words)
- Identify the source language
- Include part of speech for each word
- Add 2 example sentences for practice
- Keep culturalContext brief and helpful

Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Parse AI response
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      parsed = {
        original: text,
        fullMeaning: responseText,
        language: "unknown",
        wordBreakdown: [],
        culturalContext: "",
        exampleSentences: []
      };
    }

    res.json(parsed);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Explanation failed" });
  }
};

module.exports = { translate, getHistory, improve, explain };
