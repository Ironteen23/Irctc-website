const express = require("express");
const router = express.Router();

const {
  getAllTrains,
  createTrain,
  getTrain,
  updateTrain,
  deleteTrain,
} = require("../controllers/trains");

router.route("/").post(createTrain);
router.route("/specific").post(getAllTrains);
router.route("/:id").get(getTrain).patch(updateTrain).delete(deleteTrain);

module.exports = router;
