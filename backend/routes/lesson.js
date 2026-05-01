const express = require("express");
const router = express.Router();
const Lesson = require("../models/Lesson");

// GET ALL LESSONS
router.get("/lessons", async (req, res, next) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
