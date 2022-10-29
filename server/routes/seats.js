const express = require("express");
const router = express.Router();

const {
  createSeat,
  updateSeat,
  deleteSeat,
  getSeat,
} = require("../controllers/seats");

router.route("/").post(createSeat);
router.route("/find").post(getSeat);
router.route("/:id").patch(updateSeat).delete(deleteSeat);

module.exports = router;
