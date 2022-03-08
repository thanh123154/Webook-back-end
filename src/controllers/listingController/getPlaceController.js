const db = require("../../database/db");

const getPlace = (req, res) => {
  const sql = "select * from place";

  db.query(sql, (error, result) => {
    if (error) return res.json(error);

    const place = result;

    res.json({
      status: true,
      data: place,
    });
  });
};
module.exports = getPlace;
