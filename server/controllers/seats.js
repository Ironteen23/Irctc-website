const Seat = require("../models/seats");

const createSeat = async (req, res) => {
  try {
    const seat = await Seat.create(req.body);
    return res.status(201).json({ seat });
  } catch (error) {
    res.status(500).json({ msg: `lol error ` });
  }
};

const updateSeat = async (req, res) => {
  try {
    const { id: name } = req.params;

    const seat = await Seat.findOneAndUpdate({ name: name }, req.body);

    if (!seat) {
      return res.status(404).json({ msg: `No seat found` });
    }
    return res.status(200).json({ name: trainName }, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteSeat = async (req, res) => {
  try {
    const { id: name } = req.params;
    const seat = await Seat.findOneAndDelete({ name: name });
    if (!seat) {
      return res.status(404).json({ msg: `No trains Found` });
    }
    return res.status(200).json({ train: null, status: "sucess" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSeat = async (req, res) => {
  try {
    const { name } = req.body;
    const seat = await Seat.find({ name: name });
    if (!seat) {
      return res.status(404).json({ msg: `No seat Found` });
    }
    return res.status(200).json({ seat });
  } catch (error) {
    res.status(500).json({ msg: `no seats ig lol` });
  }
};

module.exports = {
  createSeat,
  updateSeat,
  deleteSeat,
  getSeat,
};
