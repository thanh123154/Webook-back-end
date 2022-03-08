const db = require("../../database/db");

const updatePassController = (req, res) => {
  const { id } = req.user;
  const { currentPass, newPass } = req.body;

  const sqlCheckPass = "select password from user where id = ?";

  db.query(sqlCheckPass, [id], (error, result) => {
    if (error) return res.status(502).json(error);

    const { password } = result[0];

    if (currentPass !== password) {
      return res.json({ status: false, code: "005" });
    }

    const sqlUpdatePass = `update user set password = ? where id = ?`;

    db.query(sqlUpdatePass, [newPass, id], (error, result) => {
      if (error) return res.status(502).json(error);

      return res.json({ status: true });
    });
  });
};

module.exports = updatePassController;
