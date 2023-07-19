const express = require("express");
const cors = require("cors");
const mongooseConnection = require("./db/connection");
const User = require("./db/models/user");
const app = express();
const port = process.env.PORT || 5500;
mongooseConnection();
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  const userCreated = new User(req.body);
  const userResult = await userCreated.save();
  res.send(userResult);
});
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
app.get("/", (req, res) => {
  res.send("App is working");
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
