const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  name: {
    type: String,
    requiured: [true, "Must provide a name"],
    trim: true,
  },

  ACSeats: {
    type: Number,
    requiured: [true, "Must provide ACseats"],
    trim: true,
  },

  genSeats: {
    type: Number,
    requiured: [true, "Must provide genseats"],
    trim: true,
  },

  acFare: {
    type: Number,
    requiured: [true, "Must provide ACfare"],
    trim: true,
  },

  genFare: {
    type: Number,
    requiured: [true, "Must provide genFare"],
    trim: true,
  },

  date: {
    type: Date,
    requiured: [true, "Must provide Date"],
    trim: true,
  },

  arrivalTime: {
    type: String,
    requiured: [true, "Must provide Date"],
    trim: true,
  },

  depTime: {
    type: String,
    requiured: [true, "Must provide Date"],
    trim: true,
  },
});

module.exports = mongoose.model("Seat", SeatSchema);
