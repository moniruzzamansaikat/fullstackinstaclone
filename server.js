require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));
app.use(cors());
app.use(fileupload({}));

// routes
app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  require("./utils/db");
});
