const mongoose = require("mongoose");

const url =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_DB_URL
    : process.env.DB_URL;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
  });
