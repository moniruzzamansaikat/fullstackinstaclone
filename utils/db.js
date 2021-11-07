const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
  });
