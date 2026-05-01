const express = require("express");
const router = express.Router();
const Lesson = require("../models/Lesson");
const auth = require("../middleware/auth");
const User = require("../models/User");

// GET ALL LESSONS
router.get("/lessons", async (req, res, next) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    next(err);
  }
});

// SUBMIT ANSWER
router.post("/submit", auth, async (req, res, next) => {
  try {
    const { lessonId, questionIndex, selectedAnswer } = req.body;

    // find lesson
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const question = lesson.questions[questionIndex];

    if (!question) {
      return res.status(400).json({ message: "Invalid question" });
    }

    // check answer
    const isCorrect = question.correctAnswer === selectedAnswer;

    // find user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update XP if correct
    if (isCorrect) {
      user.xp += 10;
      await user.save();
    }

    res.json({
      correct: isCorrect,
      xp: user.xp
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
