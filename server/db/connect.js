const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
//   .then(() => console.log("Connected to db"))
//   .catch((err) => console.log(err));
