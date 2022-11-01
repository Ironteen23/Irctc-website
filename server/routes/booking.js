const express = require("express");
const router = express.Router();

const {
  getAllBookings,
  createBooking,
  updateBooking,
  getBookings,
} = require("../controllers/booking");

router.route("/").post(createBooking);
router.route("/specific").post(getAllBookings);
router.route("/:id").get(getBookings);
router.route("/update").post(updateBooking);

module.exports = router;
