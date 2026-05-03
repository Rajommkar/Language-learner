const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  originalText: String,
  translatedText: String,
}, { timestamps: true });

module.exports = mongoose.model("Translation", translationSchema);
