const db = require("../../database/db");
const { v4: uuidv4 } = require("uuid");

const createListingByHostController = (req, res) => {
  const listingId = uuidv4();
  const host_id = req.user.id;

  const {
    name,
    address,
    gallery,
    price,
    detail,
    beds,
    bedrooms,
    bathrooms,
    guests,
    place,
    amenity,
    active,
    province,
    district,
    ward,
  } = req.body;

  const listingAmenity = amenity.map((item) => [uuidv4(), listingId, item.id]);

  const sqlInsert = `insert into listing (id, host_id, name, address, gallery, price, detail, beds, bedrooms, bathrooms, guests, place_id, active, province, district, ward, destination) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
  insert into listing_amenity (id, listing_id, amenity_id) values ?;
  `;

  const destination = `${address}, ${JSON.parse(ward).name}, ${
    JSON.parse(district).name
  }, ${JSON.parse(province).name}`;

  db.query(
    sqlInsert,
    [
      listingId,
      host_id,
      name,
      address,
      gallery,
      price,
      detail,
      beds,
      bedrooms,
      bathrooms,
      guests,
      place.id,
      active | 1,
      province,
      district,
      ward,
      destination,
      listingAmenity,
    ],
    (error, result) => {
      if (error) return res.json(error);

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
    }
  );
};

module.exports = createListingByHostController;
