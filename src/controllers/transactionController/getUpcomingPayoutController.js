const db = require("../../database/db");

const getUpcomingPayoutController = (req, res) => {
  const user_id = req.user.id;
  const sql = `SELECT *, listing.name as listing_name FROM transaction
    LEFT JOIN listing ON transaction.listing_id=listing.id
     where checkin >= current_timestamp() and guest_id=?`;

  db.query(sql, [user_id], (error, result) => {
    if (error) return res.json(error);

    const transaction = result;

    res.json({
      status: true,
      result: transaction,
    });
  });
};
module.exports = getUpcomingPayoutController;
