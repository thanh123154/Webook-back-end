const db = require("../../database/db");

const getAllBookingController = (req, res) => {
  const host_id = req.user.id;

  const sql = `
  select b.*, l.name as listing_name, u.name as guest_name
  from booking as b
  left join listing as l on l.id = b.listing_id
  left join user as u on u.id = b.guest_id
  where b.is_denied = -1 and l.host_id = ?
  ORDER BY b.create_at DESC;
  `;

  db.query(sql, [host_id], (error, result) => {
    if (error) return res.json(error);

    res.json({
      status: true,
      result: result,
    });
  });
};

module.exports = getAllBookingController;
