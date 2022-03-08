const router = require("express").Router();
const authController = require("../controllers/authController");

let refreshTokens = [];

router.post("/token", (req, res) =>
  authController.token(req, res, refreshTokens)
);

router.post("/login", (req, res) =>
  authController.login(req, res, refreshTokens)
);

router.post("/signup", (req, res) =>
  authController.signup(req, res, refreshTokens)
);

router.delete("/logout", (req, res) =>
  authController.logout(req, res, refreshTokens)
);

module.exports = router;
