const router = require("express").Router();
const ctrl = require("./auth.controller");
const validate = require("../../middleware/validate");
const { registerSchema, loginSchema } = require("./auth.validation");

router.post("/register", validate(registerSchema), ctrl.register);
router.post("/login", validate(loginSchema), ctrl.login);
router.post("/refresh", ctrl.refresh);

module.exports = router;