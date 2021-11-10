const router = require("express").Router();
const {
  Types: { ObjectId },
} = require("mongoose");
const Message = require("../models/Message");

// get all messages
router.get("/", async (req, res) => {
  const { userId, receiverId } = req.query;

  const messages = await Message.find({
    members: { $all: [userId, receiverId] },
  });

  console.log(messages);
  res.json(messages);
});

module.exports = router;
