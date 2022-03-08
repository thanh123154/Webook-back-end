const getDetailListing = require("./getDetailListingController");
const updateListingByHost = require("./updateListingByHostController");
const getListingByHost = require("./getListingByHostController");
const createListingByHost = require("./createListingByHostController");
const searchListing = require("./searchListingController");
const deleteListing = require("./deleteListingByHostController");
const getPlace = require("./getPlaceController");
const getAmenity = require("./getAmenityController");

module.exports = {
  getDetailListing,
  getListingByHost,
  createListingByHost,
  updateListingByHost,
  searchListing,
  deleteListing,
  getPlace,
  getAmenity,
};
