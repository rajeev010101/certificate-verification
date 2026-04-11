const router = require("express").Router();
const ctrl = require("./template.controller");
const auth = require("../../middleware/auth.middleware");

router.post("/", auth, ctrl.createTemplate);
router.get("/", auth, ctrl.getTemplates);

router.get("/:id", auth, ctrl.getTemplateById);
router.put("/:id", auth, ctrl.updateTemplate);
router.delete("/:id", auth, ctrl.deleteTemplate);
router.post("/preview/:id", auth, ctrl.previewTemplate);

module.exports = router;