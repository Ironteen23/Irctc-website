const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    requiured: [true, "Must provide a name"],
    unique: [true, "User Already exists"],
    trim: true,
  },
  password: {
    type: String,
    requiured: [true, "Must provide a password"],
    minlength: [6, "Minimum password length must be 6 characters"],
    trim: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
