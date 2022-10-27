const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createUser = async (req, res) => {
  console.log(req.body);
  const { name, password } = req.body;
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  console.log(name);
  console.log(password);
  try {
    const alreadyRegistered = await User.findOne({ name: name });
    if (alreadyRegistered) {
      res
        .status(401)
        .send({ message: "User ALready Registered with the name" });
    } else {
      // const newUser = new User({
      //   name: name,
      //   password: password,
      // }
      // );
      const newUser = await User.create(req.body);
      await newUser.save();
      const token = jwt.sign(
        { userId: newUser._id, name: newUser.name },
        "jwtSecret",
        {
          expiresIn: "30d",
        }
      );
      res.status(201).json({ newUser: { name: newUser.name }, token });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: userName } = req.params;
    const user = await User.findOneAndUpdate({ name: userName }, req.body);
    if (!user) {
      return res.status(404).json({ msg: `No user found` });
    }
    res.status(200).json({ name: userName }, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  res.send("update train");
};

const getUser = async (req, res) => {
  try {
    const { id: userName } = req.params;
    const user = await User.findOne({
      name: userName,
    });

    if (!user) {
      return res.status(404).json({ msg: `No trains Found` });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({
      name: name,
    });
    if (!user) {
      return res.status(404).json({ msg: `No User Found , please SignUP` });
    } else {
      if (user.password !== password) {
        return res.status(401).json({ msg: `Incorrect Password` });
      }

      res.status(200).json({ msg: `login sucessful` });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  loginUser,
};