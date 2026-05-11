const jwt = require("jsonwebtoken");

module.exports = async (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {

      return res.status(401).json({
        message:
          "No token provided",
      });
    }

    //////////////////////////////////////////////////////
    // TOKEN
    //////////////////////////////////////////////////////
    const token =
      authHeader.split(" ")[1];

    //////////////////////////////////////////////////////
    // VERIFY
    //////////////////////////////////////////////////////
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    //////////////////////////////////////////////////////
    // USER
    //////////////////////////////////////////////////////
    req.user = decoded;

    next();

  } catch (err) {

    console.error(
      "AUTH ERROR:",
      err
    );

    return res.status(401).json({
      message:
        "Invalid or expired token",
    });
  }
};