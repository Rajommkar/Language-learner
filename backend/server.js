const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const translateRoutes = require("./routes/translate");
app.use("/api", translateRoutes);

const mongoose = require("mongoose");
const PORT = 5000;

// Connect to MongoDB, then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err));
