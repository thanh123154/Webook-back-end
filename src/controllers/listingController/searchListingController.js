const db = require("../../database/db");

const PAGE_SIZE = 9;

const searchListingController = (req, res) => {
  const {
    page = 1,
    destination,
    checkin,
    checkout,
    guests,
    price,
    places,
    amenities,
  } = req.body;

  let sql = `select * from listing where active = 1`;

  if (destination.replace(/ /g, "") !== "") {
    sql += " and " + `destination like '%${destination}%'`;
  }

  if (parseInt(checkin).toString() !== "NaN") {
    // sql += " and " + ``
  }

  if (parseInt(checkout).toString() !== "NaN") {
    // sql += " and " + ``
  }

  if (parseInt(guests).toString() !== "NaN" && parseInt(guests) !== 0) {
    sql += " and " + `guests >= ${guests}`;
  }

  if (
    !!price &&
    parseInt(price.min).toString() !== "NaN" &&
    parseInt(price.min) !== 0
  ) {
    sql += " and " + `price >= ${price.min}`;
  }

  if (
    !!price &&
    parseInt(price.max).toString() !== "NaN" &&
    parseInt(price.max) !== 0
  ) {
    sql += " and " + `price <= ${price.max}`;
  }

  sql += ` LIMIT ${(page - 1) * PAGE_SIZE},${PAGE_SIZE}; ${sql.replace(
    "*",
    "count(*) as total"
  )}`;

  db.query(sql, (error, result) => {
    if (error) return res.json(error);

    res.json({
      status: true,
      result: result[0],
      total_result: result[1][0].total,
      total_page: Math.ceil(result[1][0].total / PAGE_SIZE),
      current_page: page,
    });
  });
};

module.exports = searchListingController;
