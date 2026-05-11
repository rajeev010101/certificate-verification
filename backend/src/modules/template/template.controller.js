const service = require("./template.service");

//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////
exports.createTemplate = async (
  req,
  res
) => {
  try {

    const template =
      await service.createTemplate({
        ...req.body,

        organizationId:
          req.user.organizationId,
      });

    res.status(201).json({
      success: true,
      data: template,
    });

  } catch (err) {

    console.error(
      "CREATE TEMPLATE ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//////////////////////////////////////////////////////
// GET ALL
//////////////////////////////////////////////////////
exports.getTemplates = async (
  req,
  res
) => {
  try {

    const data =
      await service.getTemplates(
        req.user.organizationId
      );

    res.json({
      success: true,
      templates: data,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//////////////////////////////////////////////////////
// GET ONE
//////////////////////////////////////////////////////
exports.getTemplateById =
  async (req, res) => {
    try {

      const data =
        await service.getById(
          req.params.id
        );

      res.json({
        success: true,
        data,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

//////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////
exports.deleteTemplate =
  async (req, res) => {
    try {

      await service.deleteTemplate(
        req.params.id
      );

      res.json({
        success: true,
        message: "Deleted",
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////
exports.updateTemplate =
  async (req, res) => {
    try {

      const data =
        await service.updateTemplate(
          req.params.id,
          req.body
        );

      res.json({
        success: true,
        data,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

//////////////////////////////////////////////////////
// PREVIEW
//////////////////////////////////////////////////////
exports.previewTemplate =
  async (req, res) => {
    try {

      const html =
        await service.previewTemplate(
          req.params.id,
          req.body
        );

      res.send(html);

    } catch (err) {

      console.error(
        "PREVIEW ERROR:",
        err
      );

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };