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
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: userName } = req.params;
    const user = await User.findOneAndUpdate({ name: userName }, req.body);
    if (!user) {
      return res.status(404).json({ msg: `No train found` });
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

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
};
