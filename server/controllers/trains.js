const Train = require("../models/trains");
// const Seat = require("../models/seats");

const getAllTrains = async (req, res) => {
  const { src, dest, date } = req.body;
  try {
    const trains = await Train.find({ src: src, dest: dest, date: date });
    if (!trains || trains.length == 0) {
      return res.status(400).json({ msg: `No tRAINS Found` });
    }
    // const seats = await Seat.findAll({ name: trains.name });
    // if (!seats) {
    //   return res.status(400).json({ msg: `No Seats Found` });
    // }

    return res.status(200).json({ trains });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTrain = async (req, res) => {
  try {
    const train = await Train.create(req.body);
    return res.status(201).json({ train });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTrain = async (req, res) => {
  try {
    const { id: trainName } = req.params;
    const train = await Train.findOneAndUpdate({ name: trainName }, req.body);
    if (!train) {
      return res.status(404).json({ msg: `No train found` });
    }
    return res.status(200).json({ name: trainName }, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // res.send("update train");
};

const getTrain = async (req, res) => {
  try {
    const { id: trainID } = req.params;
    const train = await Train.findOne({
      _id: trainID,
    });

    if (!train) {
      return res.status(404).json({ msg: `No trains Found` });
    }
    return res.status(200).json({ train });
  } catch (error) {
    res.status(500).json({ msg: error });
  }

  // res.json({ id: req.params.id });
};
// will give the specific train currently gives train by source destination

const deleteTrain = async (req, res) => {
  try {
    const { id: trainName } = req.params;
    const train = await Train.findOneAndDelete({ name: trainName });
    if (!train) {
      return res.status(404).json({ msg: `No trains Found` });
    }
    return res.status(200).json({ train: null, status: "sucess" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTrains,
  createTrain,
  getTrain,
  updateTrain,
  deleteTrain,
};
