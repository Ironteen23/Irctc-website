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
  if (!name || !password) {
    return res.status(400).json({ msg: `Empty username or password` });
  }
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
      // await newUser.save();
      const token = jwt.sign(
        { userId: newUser._id, name: newUser.name },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
      // const token = newUser.createJWT();
      // res
      //   .status(20)
      //   .json({ user: { name: user.name }, token });
      return res.status(201).json({ newUser: { name: newUser.name }, token });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, oldpassword, newpassword } = req.body;
    const user = await User.findOne(
      { name: name }
      // {
      //   name: name,
      //   password: newpassword,
      // }
    );
    if (!user) {
      return res.status(404).json({ msg: `Incorrect User or Password` });
    } else if (user.password !== oldpassword) {
      return res.status(401).json({ msg: `Incorrect Password` });
    }
    const updatedUser = await User.findOneAndUpdate(
      { name: name },
      {
        password: newpassword,
      }
    );

    res.status(200).json(
      // updatedUser, {
      // new: true,
      // runValidators: true,}
      { msg: `changed sucessfully` }
    );
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // res.send("update train");
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
      // const token = user.createJWT();
      const token = jwt.sign(
        { userId: user._id, name: user.name },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
      return res.status(200).json({ user: { name: user.name }, token });
      // return res.redirect("/");

      // res.status(200).json({ msg: `login sucessful` });
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
