const service = require("./template.service");

// CREATE
exports.createTemplate = async (req, res) => {
  const template = await service.createTemplate({
    ...req.body,
    organizationId: req.user.organizationId
  });

  res.json(template);
};

// GET ALL
exports.getTemplates = async (req, res) => {
  const data = await service.getTemplates(req.user.organizationId);
  res.json(data);
};

// GET ONE
exports.getTemplateById = async (req, res) => {
  const data = await service.getById(req.params.id);
  res.json(data);
};

// DELETE
exports.deleteTemplate = async (req, res) => {
  await service.deleteTemplate(req.params.id);
  res.json({ message: "Deleted" });
};

// UPDATE
exports.updateTemplate = async (req, res) => {
  const data = await service.updateTemplate(req.params.id, req.body);
  res.json(data);
};

// 🔥 PREVIEW
exports.previewTemplate = async (req, res) => {
  try {
    const html = await service.previewTemplate(
      req.params.id,
      req.body
    );

    res.send(html);
  } catch (err) {
    console.error("PREVIEW ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};