const db = require("../../database/db");

const getAmenity = (req, res) => {
  const sql = "select * from amenity";

  db.query(sql, (error, result) => {
    if (error) return res.json(error);

    const amenity = result;

    res.json({
      status: true,
      data: amenity,
    });
  });
};
module.exports = getAmenity;
