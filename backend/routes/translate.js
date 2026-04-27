const express = require("express");
const router = express.Router();
const { translate } = require("../controllers/translateController");

// TRANSLATE API
router.post("/translate", translate);

module.exports = router;
