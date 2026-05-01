const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    }
  ],
  correctAnswer: {
    type: String,
    required: true,
  }
});

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String, // beginner, intermediate, advanced
    default: "beginner",
  },
  questions: [questionSchema],
}, { timestamps: true });

module.exports = mongoose.model("Lesson", lessonSchema);
