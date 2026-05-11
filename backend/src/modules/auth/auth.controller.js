const service =
  require("./auth.service");

//////////////////////////////////////////////////////
// REGISTER
//////////////////////////////////////////////////////
exports.register =
  async (req, res) => {
    try {

      const data =
        await service.register(
          req.body
        );

      res.status(201).json(
        data
      );

    } catch (err) {

      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

//////////////////////////////////////////////////////
// LOGIN
//////////////////////////////////////////////////////
exports.login =
  async (req, res) => {
    try {

      const data =
        await service.login(
          req.body
        );

      res.json(data);

    } catch (err) {

      res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  };

//////////////////////////////////////////////////////
// REFRESH
//////////////////////////////////////////////////////
exports.refresh =
  async (req, res) => {
    try {

      const data =
        await service.refresh(
          req.body.token
        );

      res.json(data);

    } catch (err) {

      res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  };