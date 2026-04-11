const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true }
});

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    html: { type: String, required: true },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },

    logo: { type: String },

    issuerName: { type: String },
    issuerRole: { type: String },

    // ✅ NEW FIELD
    description: { type: String },

    // ✅ IMPORTANT (for your HTML)
    skills: { type: String },

    // ✅ SIGNATURES (SCALABLE)
    signatures: [signatureSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);