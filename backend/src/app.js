const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const app = express();

// 🔥 IMPORTANT: CORS FIX
const allowedOrigins = [
  "https://certificate-verification-chi.vercel.app",
  "https://certificate-verification-52cktef3j-rajeev-dahiyas-projects.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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