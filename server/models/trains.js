const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
  name: String,
  source: String,
  destination: String,
  distance: Number,
  TotalSeats: Number,
  AvailableSeats: Number,
});
