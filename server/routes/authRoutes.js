const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
} = require("../controllers/authController");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser);
// .delete(deleteUser);

module.exports = router;
