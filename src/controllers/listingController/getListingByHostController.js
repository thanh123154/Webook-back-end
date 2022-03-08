const db = require("../../database/db");

const getListingByHostController = (req, res) => {
  const host_id = req.user.id;

  const sql = `select l.*, p.name as place_name, p.desc as place_desc 
  from listing as l 
  left join place as p on l.place_id=p.id
  where host_id = ?
  ORDER BY updated_at DESC;
  `;

  db.query(sql, [host_id], (error, result) => {
    if (error) return res.json(error);

    let listings = result.map((item) => {
      item.place = {
        id: item.place_id,
        name: item.place_name,
        desc: item.place_desc,
      };

      delete item.place_id;
      delete item.place_name;
      delete item.place_desc;

      return item;
    });

    res.json({
      status: true,
      data: listings,
    });
  });
};
module.exports = getListingByHostController;
