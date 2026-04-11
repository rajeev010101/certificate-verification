const Audit = require("../modules/audit/Audit.model");

module.exports = async (action, userId, metadata = {}) => {
  await Audit.create({ action, userId, metadata });
};