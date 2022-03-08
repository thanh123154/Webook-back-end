const db = require("../../database/db");

const getHostCompletePayoutController = (req, res) => {
  const user_id = req.user.id;
  const sql = `SELECT *, listing.name as listing_name, user.name as guest_name FROM transaction
  LEFT JOIN listing ON transaction.listing_id=listing.id
  LEFT JOIN user ON transaction.guest_id=user.id
  where checkout <= current_timestamp() and host_id=?`;

  db.query(sql, [user_id], (error, result) => {
    if (error) return res.json(error);

    const transaction = result;

    res.json({
      status: true,
      result: transaction,
    });
  });
};
module.exports = getHostCompletePayoutController;
