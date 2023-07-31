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
  let userResult = await userCreated.save();
  userResult = userResult.toObject();
  delete userResult.password;
  res.send(userResult);
});
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send({
        statusCode: 200,
        message: user,
      });
    } else {
      res.send({
        statusCode: 404,
        message: "User not found",
      });
    }
  }
});
app.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});
app.get("/", (req, res) => {
  res.send("App is working");
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
