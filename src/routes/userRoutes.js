const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

// lay data cua user
router.get("/", authMiddleware, (req, res) => userController.getUser(req, res));

// cap nhat data cua user
router.patch("/", authMiddleware, (req, res) =>
  userController.editUser(req, res)
);

// cap nhat mat khau moi
router.post("/", authMiddleware, (req, res) =>
  userController.updatePass(req, res)
);

module.exports = router;
