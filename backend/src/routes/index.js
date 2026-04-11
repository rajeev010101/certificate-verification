const router = require("express").Router();

// ✅ Health check
router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// ✅ Core modules (NO app.use here)
router.use("/auth", require("../modules/auth/auth.routes"));
router.use("/certificates", require("../modules/certificate/certificate.routes"));
router.use("/templates", require("../modules/template/template.routes"));
router.use("/verify", require("../modules/verification/verification.routes"));

// Optional modules


// ✅ 404 handler
router.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

module.exports = router;