const Book = require("../models/booking");
const Train = require("../models/trains");
// const Seat = require("../models/seats");

const getAllBookings = async (req, res) => {
  const { username } = req.body;
  try {
    const books = await Book.find({ username: username });
    if (!books || books.length == 0) {
      return res.status(400).json({ msg: `No Bookings` });
    }
    // const seats = await Seat.findAll({ name: trains.name });
    // if (!seats) {
    //   return res.status(400).json({ msg: `No Seats Found` });
    // }

    return res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createBooking = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    const a = req.body.Qty;
    const id = req.body.train_id;
    const train = await Train.findOne({ _id: id });
    if (!train) {
      return res.status(400).json({ msg: `no such Train exists` });
    } else if (req.body.coachType === "AC") {
      const b = train.ACSeats - a;
      const newtrain = await Train.findOneAndUpdate(
        {
          _id: id,
        },
        {
          ACSeats: b,
        }
      );
      return res.status(201).json({ book, newtrain });
    }
    const b = train.genSeats - a;
    const newtrain = await Train.findOneAndUpdate(
      {
        _id: id,
      },
      {
        genSeats: b,
      }
    );

    return res.status(201).json({ book, newtrain });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// const updateTrain = async (req, res) => {
//   try {
//     const { id: trainName } = req.params;
//     const train = await Train.findOneAndUpdate({ name: trainName }, req.body);
//     if (!train) {
//       return res.status(404).json({ msg: `No train found` });
//     }
//     return res.status(200).json({ name: trainName }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
//   // res.send("update train");
// };

// const getTrain = async (req, res) => {
//   try {
//     const { id: trainSource } = req.params;
//     const train = await Train.findOne({
//       name: trainSource,
//     });

//     if (!train) {
//       return res.status(404).json({ msg: `No trains Found` });
//     }
//     return res.status(200).json({ train });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }

//   // res.json({ id: req.params.id });
// };
// will give the specific train currently gives train by source destination

const deleteBooking = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const book = await Train.findOneAndDelete({ _id: id });
    if (!book) {
      return res.status(404).json({ msg: `No such booking exists` });
    }
    return res.status(200).json({ train: null, status: "sucess" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllBookings,
  createBooking,
  deleteBooking,
};
