const express = require("express");
const router = express.Router();
// const authenticateUser = require("../middleware/authentication");

const {
  getAllTrains,
  createTrain,
  getTrain,
  updateTrain,
  deleteTrain,
} = require("../controllers/trains");

router.route("/").post(createTrain);
router.route("/specific").post(getAllTrains);
router.route("/:id").patch(updateTrain).delete(deleteTrain);
router.route("/specific/:id").get(getTrain);

module.exports = router;
