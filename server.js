require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const { Server } = require("socket.io");

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));
app.use(cors());
app.use(express.static(__dirname + "/client/build/"));
app.use(fileupload({}));

// routes
app.use("/api", require("./routes"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  require("./utils/db");
});

const io = new Server(server, {
  cors: {
    origin: "https://saikim.herokuapp.com/",
  },
});
require("./utils/messages")(io);
