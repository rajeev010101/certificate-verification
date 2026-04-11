const Certificate = require("../certificate/certificate.model");
const mongoose = require("mongoose");

exports.verify = async (id) => {
  let cert;

  // ✅ check if Mongo ObjectId
  if (mongoose.Types.ObjectId.isValid(id)) {
    cert = await Certificate.findById(id);
  } else {
    cert = await Certificate.findOne({ certificateId: id });
  }

  if (!cert) {
    return {
      valid: false,
      message: "Certificate not found"
    };
  }

  // ✅ safe increment
  cert.verificationCount = (cert.verificationCount || 0) + 1;
  await cert.save();

  return {
    valid: true,
    data: cert   // 👈 IMPORTANT FIX
  };
};