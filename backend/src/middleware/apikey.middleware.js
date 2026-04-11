const ApiKey = require("../modules/apikey/ApiKey.model");

module.exports = async (req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key) return res.status(401).json({ msg: "API key required" });

  const valid = await ApiKey.findOne({ key });

  if (!valid) return res.status(403).json({ msg: "Invalid API key" });

  req.organizationId = valid.organizationId;

  next();
};