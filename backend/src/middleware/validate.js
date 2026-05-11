module.exports =
  (schema) =>
  (req, res, next) => {

    //////////////////////////////////////////////////////
    // VALIDATE
    //////////////////////////////////////////////////////
    const {
      error,
    } = schema.validate(
      req.body,
      {
        abortEarly: false,

        stripUnknown: true,
      }
    );

    //////////////////////////////////////////////////////
    // ERROR
    //////////////////////////////////////////////////////
    if (error) {

      return res.status(400).json({
        success: false,

        message:
          error.details
            .map(
              (d) =>
                d.message
            )
            .join(", "),
      });
    }

    next();
  };