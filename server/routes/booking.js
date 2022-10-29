const express = require("express");
const router = express.Router();

const {
  getAllBookings,
  createBooking,
  deleteBooking,
} = require("../controllers/booking");

router.route("/").post(createBooking);
router.route("/specific").post(getAllBookings);
router.route("/:id").delete(deleteBooking);

module.exports = router;
