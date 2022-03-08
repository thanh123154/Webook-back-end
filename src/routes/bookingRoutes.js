const router = require("express").Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

// lấy danh sách các yêu cầu đặt phòng (host)
router.get("/", authMiddleware, (req, res) =>
  bookingController.getAllBookingController(req, res)
);

// đặt phòng (guest)
router.post("/", authMiddleware, (req, res) =>
  bookingController.createBookingController(req, res)
);

// từ chối yêu cầu đặt phòng (host)
router.patch("/", authMiddleware, (req, res) =>
  bookingController.denyBookingController(req, res)
);

module.exports = router;
