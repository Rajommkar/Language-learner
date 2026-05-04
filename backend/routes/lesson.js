const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getLessons, submitAnswer } = require("../controllers/lessonController");

// GET ALL LESSONS
router.get("/lessons", getLessons);

// SUBMIT ANSWER
router.post("/submit", auth, submitAnswer);

module.exports = router;
