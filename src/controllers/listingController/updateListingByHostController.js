const db = require("../../database/db");
const { v4: uuidv4 } = require("uuid");

const updateListingByHostController = (req, res) => {
  const host_id = req.user.id;
  const { id } = req.params;
  let updateVals = req.body;

  let sql = `UPDATE listing SET ? WHERE host_id = ? and id=?;`;
  let queryVals = [updateVals, host_id, id];

  if (
    !!updateVals.address &&
    !!updateVals.province &&
    !!updateVals.district &&
    !!updateVals.ward
  ) {
    updateVals.destination = `${updateVals.address}, ${
      JSON.parse(updateVals.ward).name
    }, ${JSON.parse(updateVals.district).name}, ${
      JSON.parse(updateVals.province).name
    }`;
  }

  if (!!updateVals.place) {
    updateVals.place_id = updateVals.place.id;
    delete updateVals.place;
  }

  if (!!updateVals.amenity) {
    const listingAmenity = updateVals.amenity.map((item) => [
      uuidv4(),
      id,
      item.id,
    ]);

    sql += `DELETE FROM listing_amenity WHERE listing_id=?;
    INSERT INTO listing_amenity (id, listing_id, amenity_id) VALUES ?;`;

    queryVals.push(id, listingAmenity);

    delete updateVals.amenity;
  }

  db.query(sql, queryVals, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(502).json(error);
    }

    const sqlGetListing = `select l.*, p.name as place_name, p.desc as place_desc
      from listing as l
      left join place as p on l.place_id=p.id
      where host_id = ?
      ORDER BY updated_at DESC`;

    db.query(sqlGetListing, [host_id], (error, result) => {
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
  });
};
module.exports = updateListingByHostController;
