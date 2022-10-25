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
  // arrDate: {
  //   type: Date,
  //   requiured: [true, "Must provide a name"],
  //   trim: true,
  // },
  stationFrom: {
    type: String,
    requiured: [true, "Must provide a source"],
    trim: true,
  },
  stationTo: {
    type: String,
    requiured: [true, "Must provide a destination"],
    trim: true,
  },
  // distance: {
  //   type: String,
  //   requiured: [true, "Must provide the distance"],
  //   trim: true,
  // },
  // TotalSeats: Number,
  // AvailableSeats: Number,
  // depatureTime: {
  //   type: String,
  //   requiured: [true, "Must provide a depatureTime"],
  //   trim: true,
  // },
  // arrivalTime: {
  //   type: String,
  //   requiured: [true, "Must provide a arrivalTime"],
  //   trim: true,
  // },
  stationList: [
    {
      depatureTime: {
        type: String,
        required: [true, "Must provide stationCode"],
      },
      stationCode: {
        type: String,
        required: [true, "Must provide stationCode"],
      },
      haltTime: {
        type: String,
        required: [true, "Must provide stationCode"],
      },
      dayCount: { type: String, required: [true, "Must provide stationCode"] },
      routeNumber: {
        type: String,
        required: [true, "Must provide stationCode"],
      },
      distance: { type: String, required: [true, "Must provide stationCode"] },
      arrivalTime: {
        type: String,
        required: [true, "Must provide stationCode"],
      },

      stationName: {
        type: String,
        required: [true, "Must provide stationCode"],
      },

      stnSerialNumber: {
        type: String,
        required: [true, "Must provide stationCode"],
      },
    },
  ],
});

module.exports = mongoose.model("Train", TrainSchema);
