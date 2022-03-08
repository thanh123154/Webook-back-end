const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const transactionController = require("../controllers/transactionController");

router.get("/host/past", authMiddleware, (req, res) =>
  transactionController.getHostCompletePayoutController(req, res)
);

router.get("/host/current", authMiddleware, (req, res) =>
  transactionController.getHostCurrentPayoutController(req, res)
);

router.get("/host/upcoming", authMiddleware, (req, res) =>
  transactionController.getHostUpcomingPayoutController(req, res)
);

router.patch("/guest/update/:id", authMiddleware, (req, res) =>
  transactionController.updatePayoutController(req, res)
);

router.post("/host", authMiddleware, (req, res) =>
  transactionController.createTransactionController(req, res)
);

router.get("/guest/past", authMiddleware, (req, res) =>
  transactionController.getCompletedPayoutController(req, res)
);

router.get("/guest/upcoming", authMiddleware, (req, res) =>
  transactionController.getUpcomingPayoutController(req, res)
);

module.exports = router;
