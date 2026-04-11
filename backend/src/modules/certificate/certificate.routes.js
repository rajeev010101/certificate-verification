const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const ctrl = require("./certificate.controller");
const auth = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate");
const { createSchema } = require("./certificate.validation");

// ✅ CREATE
router.post("/create", auth, validate(createSchema), ctrl.createCertificate);

// ✅ BULK
router.post("/bulk", auth, upload.single("file"), ctrl.bulkUpload);

// 🔥 FIX (THIS WAS MISSING)
router.get("/", auth, ctrl.getCertificates);

// 🔥 VERIFY
router.get("/verify/:id", ctrl.verifyCertificate);

module.exports = router;