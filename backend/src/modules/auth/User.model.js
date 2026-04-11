const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { 
  type: String, 
  enum: ["admin", "student"], 
  default: "admin" 
},
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", schema);