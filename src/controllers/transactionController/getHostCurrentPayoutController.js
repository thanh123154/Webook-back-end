const db = require("../../database/db");

const getHostCurrentPayoutController = (req, res) => {
  const user_id = req.user.id;
  const sql = `SELECT *, listing.name as listing_name, user.name as guest_name FROM transaction
     LEFT JOIN listing ON transaction.listing_id=listing.id
     LEFT JOIN user ON transaction.guest_id=user.id
     where checkin > current_timestamp() and checkout< current_timestamp() and guest_id=? `;

  db.query(sql, [user_id], (error, result) => {
    if (error) return res.json(error);

    const transaction = result;

    res.json({
      status: true,
      result: transaction,
    });
  });
};
module.exports = getHostCurrentPayoutController;
