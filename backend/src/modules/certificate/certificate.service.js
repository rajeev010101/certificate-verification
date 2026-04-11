const Certificate = require("./certificate.model");
const Template = require("../template/Template.model");

const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");
const crypto = require("crypto");

const generatePDF = require("../../utils/pdfGenerator");
const upload = require("../../utils/cloudinaryUploader");
const sendEmail = require("../../utils/emailService");
const logAction = require("../../utils/auditLogger");

//////////////////////////////////////////////////////
// 🔥 CREATE CERTIFICATE
//////////////////////////////////////////////////////
exports.createCertificate = async (payload) => {
  const {
    name,
    course,
    templateId,
    email,
    organizationId,
    userId
  } = payload;

  if (!name || !course || !templateId || !organizationId) {
    throw new Error("Missing required fields");
  }

  const template = await Template.findById(templateId);
  if (!template) throw new Error("Template not found");

  // ✅ CLEAN CERT ID
  const certificateId =
    "CERT-" +
    Date.now().toString().slice(-6) +
    "-" +
    Math.floor(Math.random() * 999);

  // ✅ STRONG HASH
  const hash = crypto
    .createHash("sha256")
    .update(`${name}-${course}-${certificateId}-${Date.now()}`)
    .digest("hex");

  // ✅ QR
  const verifyUrl = `${
    process.env.FRONTEND_URL || "http://localhost:5173"
  }/verify/${certificateId}`;

  const qrBase64 = await QRCode.toDataURL(verifyUrl);

  // ✅ TEMPLATE ENGINE
  let html = template.html;

  const data = {
    name,
    course,
    certificateId,
    date: new Date().toLocaleDateString(),
    description: template.description || "Completed successfully",
    skills: template.skills || "",
    logo: template.logo || "",
    issuerName: template.issuerName || "",
    issuerRole: template.issuerRole || "",
    signature1: template.signatures?.[0]?.image || "",
    signature2: template.signatures?.[1]?.image || "",
    qr: qrBase64
  };

  Object.keys(data).forEach((key) => {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), data[key] || "");
  });

  // ✅ PDF
  const pdf = await generatePDF(html);

  // ✅ UPLOAD
  const uploaded = await upload(pdf);

  // ✅ SAVE
  const cert = await Certificate.create({
    name,
    email,
    course,
    certificateId,
    hash,
    pdfUrl: uploaded.secure_url,
    organizationId,
    startDate: new Date(),
    endDate: new Date(),
    domain: "Software Development"
  });

  // ✅ EMAIL (async)
  if (email) {
    sendEmail(email, cert.pdfUrl).catch(console.error);
  }

  await logAction("CERT_CREATED", userId, { certificateId });

  return cert;
};

//////////////////////////////////////////////////////
// 🔥 GET CERTIFICATES (FIX DASHBOARD)
//////////////////////////////////////////////////////
exports.getCertificates = async ({
  organizationId,
  page = 1,
  limit = 10,
  search = ""
}) => {
  const skip = (page - 1) * limit;

  const query = {
    organizationId,
    name: { $regex: search, $options: "i" }
  };

  const [data, total] = await Promise.all([
    Certificate.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Certificate.countDocuments(query)
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
};

//////////////////////////////////////////////////////
// 🔥 VERIFY CERTIFICATE
//////////////////////////////////////////////////////
exports.verifyCertificate = async (certificateId) => {
  const cert = await Certificate.findOne({ certificateId });

  if (!cert) return null;

  cert.verificationCount += 1;
  await cert.save();

  return cert;
};