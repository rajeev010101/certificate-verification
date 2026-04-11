const router = require("express").Router();
const ctrl = require("./verification.controller");

// ✅ CLEAN ROUTE
router.get("/:id", ctrl.verify);

module.exports = router;