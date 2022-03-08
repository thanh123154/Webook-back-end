const db = require("../../database/db");

const getUserController = (req, res) => {
  const sql = "select * from user where id = ?";

  const { id } = req.user;

  db.query(sql, [id], (error, result) => {
    if (error) return res.json(error);

    const user = result[0];
    delete user.password;

    res.json({ status: true, data: { user_data: user } });
  });
};

module.exports = getUserController;
