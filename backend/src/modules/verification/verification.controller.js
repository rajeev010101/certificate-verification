const service = require("./verification.service");

exports.verify = async (req, res) => {
  const result = await service.verify(req.params.id);

  if (!result.valid) {
    return res.status(404).json(result);
  }

  res.json(result);
};