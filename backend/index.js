const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
const mongooseConnection = require("./db/connection");
const User = require("./db/models/user");
const Product = require("./db/models/product");
const app = express();
const port = process.env.PORT || 5500;
mongooseConnection();
app.use(express.json());
app.use(cors());
function verifyToken(req,res,next){
  let token = req.headers['authorization'];
  if(token){
    token = token.split(' ')[1];
    jwt.verify(token,jwtKey,(err,valid)=>{
      if(err){
        res.status(401).send({result:"Invaild Authentication"});
      } else{
        next();
      }
    });
  
  } else {
    res.status(404).send({result:"Token not found"});
  } 
}
app.post("/register", verifyToken,async (req, res) => {
  const userCreated = new User(req.body);
  let userResult = await userCreated.save();
  userResult = userResult.toObject();
  delete userResult.password;
  jwt.sign({userResult},jwtKey,{expiresIn:'2h'},(err,token)=>{
    if(err){
      res.send({result:'Something went wrong. Please try again.'});
    }
    res.send({
      statusCode: 200,
      message: userResult,
      auth:token
    });
  })
});
app.post("/login",verifyToken, async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
        if(err){
          res.send({result:'Something went wrong. Please try again.'});
        }
        res.send({
          statusCode: 200,
          message: user,
          auth:token
        });
      });
    } else {
      res.send({
        statusCode: 404,
        message: "User not found",
      });
    }
  }
});
app.post("/add-product",verifyToken, async (req, res) => {
  const productCreated = new Product(req.body);
  let productResult = await productCreated.save();
  res.send(productResult);
});
app.get("/products",verifyToken, async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
app.get("/users",verifyToken, async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});
app.delete("/product/:id",verifyToken, async (req, res) => {
  const product = await Product.findByIdAndDelete({ _id: req.params.id });
  res.send(product);
});
app.get("/product/:id", verifyToken,async (req, res) => {
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
app.get("/search/:key",verifyToken,async(req,res)=>{
  let result = await Product.find({
    "$or":[{name:{$regex:req.params.key}},
      {category:{$regex:req.params.key}},
      {price:{$regex:req.params.key}},
      {company:{$regex:req.params.key}}]
  });
  res.send(result);
})
app.put("/product/:id",verifyToken, async (req, res) => {
  const product = await Product.findByIdAndUpdate({ _id: req.params.id },{$set:{...req.body}},{new:true});
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
