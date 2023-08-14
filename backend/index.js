const express = require("express");
const cors = require("cors");
const mongooseConnection = require("./db/connection");
const User = require("./db/models/user");
const Product = require("./db/models/product");
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
app.post("/add-product", async (req, res) => {
  const productCreated = new Product(req.body);
  let productResult = await productCreated.save();
  res.send(productResult);
});
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
app.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});
app.delete("/product/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete({ _id: req.params.id });
  res.send(product);
});
app.get("/product/:id", async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      errorCode: 404,
      message: "Product not found",
    });
  }
});
app.get("/", (req, res) => {
  res.send("App is working");
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
