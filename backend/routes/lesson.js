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

    const totalLessons = await Lesson.countDocuments();

    // check answer
    const isCorrect = String(question.correctAnswer).trim() === String(selectedAnswer).trim();

    // find user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update XP
    if (isCorrect) {
      user.xp += 10;
    }

    // mark lesson complete (only once)
    if (!user.completedLessons.includes(lessonId)) {
      user.completedLessons.push(lessonId);
    }

    // update progress
    user.progress = totalLessons > 0 ? Math.floor((user.completedLessons.length / totalLessons) * 100) : 0;

    await user.save();

    res.json({
      correct: isCorrect,
      xp: user.xp,
      progress: user.progress
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
