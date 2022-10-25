const express = require("express");
var cors = require("cors");
const app = express();
const trains = require("./routes/trains");
const users = require("./routes/authRoutes");
const port = 5000;
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/trains", trains);
app.use("/api/v1/users", users);
app.use("/api/v1/users/login", users);
app.use("/api/v1/users/signup", users);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// app.get('api/v1/trains') - get all trains
// app.post('api/v1/trains') - create a new train
// app.get('/api/v1/trains/:id') - get specific trains
// app.patch('/api/v1/trains/:id') - update a specific train
