const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting (max 100 requests per 15 min per IP)
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests, please try again later" }
});
app.use(limiter);

const path = require("path");
app.use(express.static(path.join(__dirname, "..")));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const translateRoutes = require("./routes/translate");
app.use("/api", translateRoutes);

const lessonRoutes = require("./routes/lesson");
app.use("/api", lessonRoutes);

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

const mongoose = require("mongoose");
const PORT = 5000;

console.log("Connecting to MongoDB...");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB ERROR:", err.message);
  });
