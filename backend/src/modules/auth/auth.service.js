const User = require("./User.model");


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateTokens = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
    organizationId: user.organizationId
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  return { accessToken, refreshToken };
};

// REGISTER (with organization)
exports.register = async ({ name, email, password, organizationName }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const org = await Organization.create({
    name: organizationName
  });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    organizationId: org._id
  });

  return generateTokens(user);
};

// LOGIN
exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return generateTokens(user);
};

// REFRESH TOKEN
exports.refresh = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return generateTokens(decoded);
  } catch {
    throw new Error("Invalid refresh token");
  }
};