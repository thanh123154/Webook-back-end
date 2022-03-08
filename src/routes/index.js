const authRoute = require("./authRoutes");
const userRoute = require("./userRoutes");
const listingRoute = require("./listingRoutes");
const transactionRoute = require("./transactionRoutes");
const bookingRoute = require("./bookingRoutes");

const routes = (app) => {
  app.use("/auth", authRoute);
  app.use("/user", userRoute);
  app.use("/listing", listingRoute);
  app.use("/transaction", transactionRoute);
  app.use("/booking", bookingRoute);
};

module.exports = routes;
