const service = require("./certificate.service");
const processCSV = require("../../jobs/csv.processor");

// ✅ CREATE
exports.createCertificate = async (req, res) => {
  try {
    if (!req.body.templateId) {
      return res.status(400).json({ message: "Template required" });
    }

    const cert = await service.createCertificate({
      ...req.body,
      organizationId: req.user.organizationId,
      userId: req.user.id
    });

    res.json(cert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ BULK
exports.bulkUpload = async (req, res) => {
  processCSV(req.file.path);

  res.json({ message: "Bulk upload started 🚀" });
};

// 🔥 GET CERTIFICATES (FIX)
exports.getCertificates = async (req, res) => {
  try {
    const result = await service.getCertificates({
      organizationId: req.user.organizationId,
      page: req.query.page,
      search: req.query.search || ""
    });

    res.json(result.data); // dashboard expects array
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch certificates" });
  }
};

// 🔥 VERIFY
exports.verifyCertificate = async (req, res) => {
  try {
    const cert = await service.verifyCertificate(req.params.id);

    if (!cert) {
      return res.status(404).json({ valid: false });
    }

    res.json({ valid: true, cert });
  } catch (err) {
    res.status(500).json({ valid: false });
  }
};