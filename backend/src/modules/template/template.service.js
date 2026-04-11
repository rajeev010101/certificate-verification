const Template = require("./Template.model");
const compile = require("../../utils/templateEngine");

// CREATE
exports.createTemplate = async (data) => {
  return await Template.create(data);
};

// GET ALL
exports.getTemplates = async (organizationId) => {
  return await Template.find({ organizationId });
};

// GET ONE
exports.getById = async (id) => {
  const template = await Template.findById(id);

  if (!template) throw new Error("Template not found");

  return template;
};

// DELETE
exports.deleteTemplate = async (id) => {
  return await Template.findByIdAndDelete(id);
};

// UPDATE
exports.updateTemplate = async (id, data) => {
  return await Template.findByIdAndUpdate(id, data, { new: true });
};

// 🔥 PREVIEW ENGINE (FIXED)
exports.previewTemplate = async (id, data) => {
  const template = await Template.findById(id);
  if (!template) throw new Error("Template not found");

  return compile(template.html, {
    name: data.name || "John Doe",
    course: data.course || "Full Stack",
    date: new Date().toLocaleDateString(),
    description: data.description || template.description || "Certificate Preview",

    // ✅ NEW
    skills: data.skills || template.skills || "React, Node.js",

    certificateId: "PREVIEW123",

    qr: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=preview",

    logo: template.logo,
    issuerName: template.issuerName,
    issuerRole: template.issuerRole,

    signature1: template.signatures?.[0]?.image || "",
    signature2: template.signatures?.[1]?.image || ""
  });
};