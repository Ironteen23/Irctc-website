const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
  name: {
    type: String,
    requiured: [true, "Must provide a name"],
    trim: true,
  },
  depDate: {
    type: Date,
    requiured: [true, "Must provide a name"],
    trim: true,
  },
  arrDate: {
    type: Date,
    requiured: [true, "Must provide a name"],
    trim: true,
  },
  source: {
    type: String,
    requiured: [true, "Must provide a source"],
    trim: true,
  },
  destination: {
    type: String,
    requiured: [true, "Must provide a destination"],
    trim: true,
  },
  distance: {
    type: String,
    requiured: [true, "Must provide the distance"],
    trim: true,
  },
  // TotalSeats: Number,
  // AvailableSeats: Number,
  depatureTime: {
    type: String,
    requiured: [true, "Must provide a depatureTime"],
    trim: true,
  },
  arrivalTime: {
    type: String,
    requiured: [true, "Must provide a arrivalTime"],
    trim: true,
  },
});

module.exports = mongoose.model("Train", TrainSchema);
