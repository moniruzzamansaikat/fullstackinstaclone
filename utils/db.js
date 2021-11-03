const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/fullStackInstaClone", {})
  .then(() => {
    console.log("db connected");
  });
