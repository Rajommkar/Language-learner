const Lesson = require("../models/Lesson");
const User = require("../models/User");

const getLessons = async (req, res, next) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    next(err);
  }
};

const submitAnswer = async (req, res, next) => {
  try {
    const { lessonId, questionIndex, selectedAnswer } = req.body;

    if (!lessonId || questionIndex === undefined || selectedAnswer === undefined) {
      return res.status(400).json({ message: "lessonId, questionIndex, and selectedAnswer are required" });
    }

    if (typeof questionIndex !== "number" || questionIndex < 0) {
      return res.status(400).json({ message: "questionIndex must be a non-negative number" });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(lessonId)) {
      return res.status(400).json({ message: "Invalid lessonId format" });
    }

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

    // update XP and mark lesson complete (only once)
    const hasCompleted = user.completedLessons.some(id => id.toString() === String(lessonId));
    if (isCorrect && !hasCompleted) {
      user.xp += 10;
      user.completedLessons.push(lessonId);
      
      // Update Level (100 XP per level)
      user.level = Math.floor(user.xp / 100) + 1;
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
};

module.exports = { getLessons, submitAnswer };
