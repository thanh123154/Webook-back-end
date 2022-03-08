const router = require("express").Router();
const listingController = require("../controllers/listingController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/host", authMiddleware, (req, res) =>
  listingController.getListingByHost(req, res)
);

router.post("/host", authMiddleware, (req, res) =>
  listingController.createListingByHost(req, res)
);

router.patch("/host/:id", authMiddleware, (req, res) =>
  listingController.updateListingByHost(req, res)
);

router.delete("/host/:id", authMiddleware, (req, res) =>
  listingController.deleteListing(req, res)
);

router.get("/place", (req, res) => listingController.getPlace(req, res));

router.get("/amenity", (req, res) => listingController.getAmenity(req, res));

router.get("/:id", (req, res) => listingController.getDetailListing(req, res));

router.post("/", (req, res) => listingController.searchListing(req, res));

module.exports = router;
