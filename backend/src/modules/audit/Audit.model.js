const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  action: String,
  userId: mongoose.Schema.Types.ObjectId,
  metadata: Object
}, { timestamps: true });

module.exports = mongoose.model("Audit", schema);