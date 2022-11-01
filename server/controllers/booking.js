const Book = require("../models/booking");
const Train = require("../models/trains");
// const Seat = require("../models/seats");

const getAllBookings = async (req, res) => {
  const { username } = req.body;
  try {
    const books = await Book.find({ username: username });
    if (!username) {
      return res.status(401).json({ msg: `Empty username` });
    } else if (!books || books.length == 0) {
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
    // const book = await Book.create(req.body);
    const a = req.body.Qty;
    const id = req.body.train_id;
    const train = await Train.findOne({ _id: id });
    if (!train) {
      return res.status(400).json({ msg: `no such Train exists` });
    } else if (req.body.coachType === "AC") {
      if (a <= train.ACSeats) {
        const book = await Book.create(req.body);

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
      } else {
        return res.status(404).json({ msg: `NO SEATS AVAILABLE ` });
      }
    } else {
      if (a <= train.genSeats) {
        const book = await Book.create(req.body);
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
      } else {
        return res.status(404).json({ msg: `NO SEATS AVAILABLE ` });
      }
    }
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

const getBookings = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findOne({
      _id: id,
    });

    if (!book) {
      return res.status(404).json({ msg: `No Such Bookings Found` });
    }
    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ msg: error });
  }

  // res.json({ id: req.params.id });
};
// will give the specific train currently gives train by source destination

const updateBooking = async (req, res) => {
  try {
    const a = req.body.Qty;
    const id = req.body.train_id;
    const ticket = req.body.ticket_id;
    const type = req.body.coachType;

    const train = await Train.findOne({ _id: id });
    // if (!train) {
    //   return res.status(400).json({ msg: `no such Train exists` });
    // } else {
    // const newtrain = null;
    if (type === "AC") {
      const b = a + train.ACSeats;
      const newtrain = await Train.findOneAndUpdate(
        { _id: id },
        {
          ACSeats: b,
        }
      );

      const book = await Book.findOneAndUpdate(
        { _id: ticket },
        {
          status: "Cancelled",
        }
      );
      if (!book || book.length == 0) {
        return res.status(404).json({ msg: `No such booking exists` });
      }
      return res.status(200).json({ book, newtrain });
    }
    const b = a + train.genSeats;
    const newtrain = await Train.findOneAndUpdate(
      { _id: id },
      {
        genSeats: b,
      }
    );

    const book = await Book.findOneAndUpdate(
      { _id: ticket },
      {
        status: "Cancelled",
      }
    );
    if (!book || book.length == 0) {
      return res.status(404).json({ msg: `No such booking exists` });
    }
    return res.status(200).json({ book, newtrain });

    // }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllBookings,
  createBooking,
  updateBooking,
  getBookings,
};
