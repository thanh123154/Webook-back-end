const db = require("../../database/db");

const editUserController = (req, res) => {
  const { id } = req.user;
  const updateVals = req.body;

  const sql = `update user set ? where id = ?`;

  db.query(sql, [updateVals, id], (error, result) => {
    if (error) return res.status(502).json(error);

    const sqlGet = "select * from user where id = ?";

    db.query(sqlGet, [id], (error, result) => {
      if (error) return res.status(502).json(error);

      const user = result[0];

      res.json({ status: true, data: { user_data: user } });
    });
  });
};

module.exports = editUserController;
