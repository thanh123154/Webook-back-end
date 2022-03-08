const db = require("../../database/db");
const { v4: uuidv4 } = require("uuid");

const createTransactionController = (req, res) => {
  const transaction_id = uuidv4();

  const { guest_id, listing_id, checkin, checkout, total, guests } = req.body;

  const insertSql = `
  insert into transaction 
  (id, guest_id, listing_id, checkin, checkout, price , guests)
  values
  (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertSql,
    [transaction_id, guest_id, listing_id, checkin, checkout, total, guests],
    (error, result) => {
      if (error) return res.json(error);

      res.json({
        status: true,
      });
    }
  );
};

module.exports = createTransactionController;
