const db = require("../../database/db");

const updatePayoutController = (req, res) => {
  const guest_id = req.user.id;
  const { id } = req.params;
  const { review, rating } = req.body;
  const sql =
    "UPDATE transaction set review = ? , rating=? where guest_id = ? and id = ?";

  db.query(sql, [review, rating, guest_id, id], (error, result) => {
    if (error) return res.json(error);

    const transaction = result;

    res.json({
      status: true,
      result: transaction,
    });
  });
};
module.exports = updatePayoutController;
