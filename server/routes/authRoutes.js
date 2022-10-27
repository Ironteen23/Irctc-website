const express = require("express");
const router = express.Router();
// const cors = require("cors");

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  loginUser,
} = require("../controllers/authController");

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/login/change").patch(updateUser);
router.route("/admin").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser);
// .delete(deleteUser);

module.exports = router;
