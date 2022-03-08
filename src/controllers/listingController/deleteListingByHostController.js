const db = require("../../database/db");

const deleteListingByHostController = (req, res) => {
  const host_id = req.user.id;
  const { id } = req.params;

  const sql = "delete from listing where host_id=? and id=?";

  db.query(sql, [host_id, id], (error, result) => {
    if (error) return res.status(502).json(error);

    const sqlListing = "select * from listing where host_id=?";

    db.query(sqlListing, [host_id], (error, result) => {
      if (error) return res.json(error);

      const listing = result;

      res.json({ status: true, data: listing });
    });
  });
};
module.exports = deleteListingByHostController;
