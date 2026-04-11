const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/api", require("./routes"));

app.use(require("./middleware/error.middleware"));

module.exports = app;