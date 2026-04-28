const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  originalText: {
    type: String,
    required: true,
  },
  translatedText: {
    type: String,
    required: true,
  },
  sourceLanguage: {
    type: String,
    default: "auto",
  },
  targetLanguage: {
    type: String,
    default: "en",
  },
}, { timestamps: true });

module.exports = mongoose.model("Translation", translationSchema);
