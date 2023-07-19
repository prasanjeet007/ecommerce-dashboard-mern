const mongoose = require("mongoose");
function connection() {
  mongoose
    .connect("mongodb://localhost:27017/e-commerce")
    .then(() => {
      console.log("Connection successful");
    })
    .catch((err) => {
      console.log("Connection Unsuccessful");
    });
}
module.exports = connection;
