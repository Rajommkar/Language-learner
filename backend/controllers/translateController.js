const { GoogleGenerativeAI } = require("@google/generative-ai");
const Translation = require("../models/Translation");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// In-memory cache
const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000;
const CACHE_MAX_SIZE = 500;

function addToCache(key, translated) {
  if (cache.size >= CACHE_MAX_SIZE) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(key, { translated, timestamp: Date.now() });
}

// Helper to clean and parse AI JSON responses
function parseAIResponse(text) {
  try {
    // Remove markdown code blocks if present
    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (err) {
    throw new Error("Failed to parse AI response: " + err.message);
  }
}

const translate = async (req, res, next) => {
  try {
    const { text, targetLang } = req.body;
    const target = targetLang || "en";

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const cacheKey = `${text.trim().toLowerCase()}::${target}`;

    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return res.json({ original: text, translated: cached.translated, source: "cache" });
      }
      cache.delete(cacheKey);
    }

    const existing = await Translation.findOne({
      originalText: { $regex: new RegExp(`^${text.trim()}$`, "i") },
      targetLanguage: target
    });

    if (existing) {
      addToCache(cacheKey, existing.translatedText);
      return res.json({ original: text, translated: existing.translatedText, source: "database" });
    }

    const prompt = `Translate the following text to ${target}. Return ONLY the translated text, nothing else. No quotes, no explanation.\n\nText: "${text}"`;
    const result = await model.generateContent(prompt);
    const translatedText = result.response.text().trim();

    const translation = new Translation({
      user: req.user ? req.user.id : null,
      originalText: text,
      translatedText: translatedText,
    });

    await translation.save();
    addToCache(cacheKey, translatedText);

    res.json({ original: text, translated: translatedText, source: "ai" });
  } catch (err) {
    next(err);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const translations = await Translation.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(translations);
  } catch (err) {
    next(err);
  }
};

const improve = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const prompt = `You are an expert language tutor. Analyze the following sentence and return a JSON response (no markdown, no code fences, just raw JSON) with this exact structure:
{
  "original": "the original text",
  "improved": "the grammatically correct and natural version in the same language",
  "translated": "English translation of the improved version",
  "tips": ["tip 1", "tip 2"],
  "grammarScore": 85
}
Sentence: "${text}"`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    res.json(parseAIResponse(responseText));
  } catch (err) {
    next(err);
  }
};

const explain = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const prompt = `You are an expert language teacher. Explain the following text in detail. Return a JSON response (no markdown, no code fences, just raw JSON) with this exact structure:
{
  "original": "the original text",
  "fullMeaning": "complete English translation/meaning",
  "language": "detected source language",
  "wordBreakdown": [
    { "original": "word1", "meaning": "English meaning", "partOfSpeech": "noun/verb/etc" }
  ],
  "culturalContext": "...",
  "exampleSentences": ["..."]
}
Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    res.json(parseAIResponse(responseText));
  } catch (err) {
    next(err);
  }
};

module.exports = { translate, getHistory, improve, explain };
