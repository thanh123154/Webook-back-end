const db = require("../../database/db");
const { v4: uuidv4 } = require("uuid");

const createBookingController = (req, res) => {
  const booking_id = uuidv4();

  const { guest_id, listing_id, checkin, checkout, total, guests } = req.body;

  const insertSql = `
  insert into booking 
  (id, guest_id, listing_id, checkin, checkout, total, guests, is_denied)
  values
  (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertSql,
    [booking_id, guest_id, listing_id, checkin, checkout, total, guests, -1],
    (error, result) => {
      if (error) return res.json(error);

      res.json({
        status: true,
      });
    }
  );
};

module.exports = createBookingController;
