const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,

      enum: [
        "super_admin",
        "admin",
        "manager",
        "student",
      ],

      default: "admin",
    },

    status: {
      type: String,

      enum: [
        "active",
        "suspended",
        "blocked",
      ],

      default: "active",
    },

    organizationId: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Organization",

      required: true,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    lastLoginAt: Date,
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);