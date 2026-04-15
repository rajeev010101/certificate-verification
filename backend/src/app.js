const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const app = express();

// 🔥 IMPORTANT: CORS FIX
app.use(cors({
  origin: "https://certificate-verification-chi.vercel.app/", // 👈 PUT YOUR REAL URL
  credentials: true
}));

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ✅ Routes
app.use("/api", require("./routes"));

// ✅ Root route (optional but helpful)
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ Error handler
app.use(require("./middleware/error.middleware"));

module.exports = app;