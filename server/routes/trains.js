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
router.route("/:id").delete(deleteTrain);
router.route("/specific/:id").get(getTrain);
router.route("/update").post(updateTrain);

module.exports = router;
