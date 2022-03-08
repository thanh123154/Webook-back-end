const jwt = require("jsonwebtoken");

const accessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: `${process.env.EXPIRES_IN}`,
  });
};

const refreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = { accessToken, refreshToken };
