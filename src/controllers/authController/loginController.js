const db = require("../../database/db");
const generateToken = require("../../utils/generateToken");

const loginController = (req, res, refreshTokens) => {
  const { email, password } = req.body;

  const sqlCheckEmail = "select * from user where email = ?";

  db.query(sqlCheckEmail, [email], (error, result) => {
    if (error) return res.status(502).json(error);

    if (result.length === 0)
      return res.json({
        status: false,
        code: "001", // tai khoan khong ton tai
      });

    const user = result[0];

    if (user.password !== password)
      return res.json({
        status: false,
        code: "002", // mat khau khong chinh xac
      });

    delete user.password;

    const accessToken = generateToken.accessToken({ id: user.id });
    const refreshToken = generateToken.refreshToken({ id: user.id });

    refreshTokens.push(refreshToken);

    res.json({
      status: true,
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
        user_data: user,
      },
    });
  });
};

module.exports = loginController;
