const Train = require("../models/trains");

const getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find({});
    res.status(200).json({ trains: trains });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTrain = async (req, res) => {
  try {
    const train = await Train.create(req.body);
    res.status(201).json({ train });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTrain = (req, res) => {
  res.send("update train");
};

const getTrain = async (req, res) => {
  try {
    const { id: trainSource } = req.params;
    const train = await Train.findOne({ source: trainSource });

    if (!train) {
      return res.status(404).json({ msg: `No trains Found` });
    }
    res.status(200).json({ train });
  } catch (error) {
    res.status(500).json({ msg: error });
  }

  res.json({ id: req.params.id });
};
// will give the specific train currently gives train by source destination

const deleteTrain = (req, res) => {
  res.send("delete train");
};

module.exports = {
  getAllTrains,
  createTrain,
  getTrain,
  updateTrain,
  deleteTrain,
};
