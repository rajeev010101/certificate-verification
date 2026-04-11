const service = require("./auth.service");

exports.register = async (req, res) => {
  const data = await service.register(req.body);
  res.json(data);
};

exports.login = async (req, res) => {
  const data = await service.login(req.body);
  res.json(data);
};

exports.refresh = async (req, res) => {
  const { token } = req.body;
  const data = await service.refresh(token);
  res.json(data);
};