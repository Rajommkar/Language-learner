const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { translate, getHistory } = require("../controllers/translateController");

// TRANSLATE API
router.post("/translate", translate);

// TRANSLATION HISTORY (Protected)
router.get("/translate/history", auth, getHistory);

module.exports = router;
