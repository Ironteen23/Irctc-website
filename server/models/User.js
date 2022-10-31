const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

// UserSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });
// UserSchema.methods.createJWT = function () {
//   return jwt.sign(
//     { userId: this._id, name: this.name },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_LIFETIME,
//     }
//   );
// };

module.exports = mongoose.model("User", UserSchema);
