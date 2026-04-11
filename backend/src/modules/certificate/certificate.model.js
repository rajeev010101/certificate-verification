const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    course: String,

    certificateId: {
      type: String,
      unique: true,
      index: true
    },

    startDate: Date,
    endDate: Date,
    domain: String,

    hash: String,
    pdfUrl: String,

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true
    },

    verificationCount: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["valid", "revoked"],
      default: "valid"
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", schema);