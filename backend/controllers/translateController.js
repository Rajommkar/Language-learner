const { GoogleGenerativeAI } = require("@google/generative-ai");
const Translation = require("../models/Translation");
const axios = require("axios");

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
    const { text, sourceLang, targetLang, sourceLanguage, targetLanguage, translatedText: passedTranslation } = req.body;
    const source = sourceLang || "auto";
    const target = targetLang || "en";

    if (!text || text.length > 5000) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // If passedTranslation is already provided by frontend direct fetch, save it directly!
    if (passedTranslation) {
      const translation = new Translation({
        user: req.user ? req.user.id : null,
        originalText: text,
        translatedText: passedTranslation,
        sourceLang: source,
        targetLang: target,
        sourceLanguage,
        targetLanguage
      });
      await translation.save();
      return res.json({ original: text, translated: passedTranslation, source: "direct" });
    }

    const cacheKey = `${text.trim().toLowerCase()}::${source}::${target}`;

    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return res.json({ original: text, translated: cached.translated, source: "cache" });
      }
      cache.delete(cacheKey);
    }

    const existing = await Translation.findOne({
      originalText: { $regex: new RegExp(`^${text.trim()}$`, "i") }
    });

    if (existing) {
      addToCache(cacheKey, existing.translatedText);
      return res.json({ original: text, translated: existing.translatedText, source: "database" });
    }

    let translatedText;
    let provider = "ai";

    try {
      const prompt = `Translate the following text from ${source === 'auto' ? 'detected language' : source} to ${target}. Return ONLY the translated text, nothing else. No quotes, no explanation.\n\nText: "${text}"`;
      const result = await model.generateContent(prompt);
      translatedText = result.response.text().trim();
    } catch (aiError) {
      console.warn("Gemini AI failed, trying MyMemory fallback API...", aiError.message);
      try {
        const response = await axios.get("https://api.mymemory.translated.net/get", {
          params: {
            q: text,
            langpair: `${source}|${target}`
          }
        });
        if (response.data && response.data.responseData) {
          translatedText = response.data.responseData.translatedText;
          provider = "fallback-api";
        } else {
          throw new Error("Invalid response structure from MyMemory");
        }
      } catch (fallbackError) {
        console.error("MyMemory fallback API also failed:", fallbackError.message);
        throw new Error("Translation failed. Both Gemini AI and fallback translation APIs are offline.");
      }
    }

    const translation = new Translation({
      user: req.user ? req.user.id : null,
      originalText: text,
      translatedText: translatedText,
      sourceLang: source,
      targetLang: target,
      sourceLanguage,
      targetLanguage
    });

    await translation.save();
    addToCache(cacheKey, translatedText);

    res.json({ original: text, translated: translatedText, source: provider });
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
    if (!text || text.length > 5000) return res.status(400).json({ message: "Invalid input" });

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
    if (!text || text.length > 5000) return res.status(400).json({ message: "Invalid input" });

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
