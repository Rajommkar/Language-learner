const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { register, login, getUser } = require("../controllers/authController");

// REGISTER API
router.post("/register", register);

// LOGIN API
router.post("/login", login);

// GET USER DATA (Protected)
router.get("/user", auth, getUser);

module.exports = router;
