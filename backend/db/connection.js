const mongoose = require("mongoose");
function connection() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/e-commerce")
    .then(() => {
      console.log("Connection successful");
    })
    .catch((err) => {
      console.log("Connection Unsuccessful");
    });
}
module.exports = connection;
