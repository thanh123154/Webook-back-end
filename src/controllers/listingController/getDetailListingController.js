const db = require("../../database/db");

const getDetailListingController = (req, res) => {
  const { id } = req.params;

  const sql = `
  select l.*, p.name as place_name, p.desc as place_desc, u.avatar as host_avatar, u.name as host_name
  from listing as l
  left join place as p on l.place_id=p.id
  left join user as u on u.id=l.host_id
  where l.id=?;
  select a.* from amenity as a
  join listing_amenity as la on a.id=la.amenity_id
  where la.listing_id=?`;

  db.query(sql, [id, id], (error, result) => {
    if (error) return res.json(error);

    const listing = result[0][0];

    listing.place = {
      id: listing.place_id,
      name: listing.place_name,
      desc: listing.place_desc,
    };

    delete listing.place_id;
    delete listing.place_name;
    delete listing.place_desc;

    listing.host = {
      id: listing.host_id,
      name: listing.host_name,
      avatar: listing.host_avatar,
    };

    delete listing.host_id;
    delete listing.host_name;
    delete listing.host_avatar;

    listing.amenity = result[1];

    res.json({ status: true, result: listing });
  });
};

module.exports = getDetailListingController;
