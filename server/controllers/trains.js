const getAllTrains = (req, res) => {
  res.send("all trains lol");
};

const createTrain = (req, res) => {
  res.json(req.body);
};

const updateTrain = (req, res) => {
  res.send("update train");
};

const getTrain = (req, res) => {
  res.json({ id: req.params.id });
};
// will give the specific train

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
