const Conversation = require("../models/Conversation");
const router = require("express").Router();

// create new converstation
// body {senderId, receiverId}
router.post("/", async (req, res) => {
  try {
    const conversation = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    return res.json(conversation);
  } catch (error) {
    res.json({ errors: "something went wrong" });
  }
});

// get converstation by members
router.post("/get", async (req, res) => {
  const { members } = req.body;
  const conversation = await Conversation.findOne({
    members,
  });

  console.log(conversation);
  res.json(conversation);
});

module.exports = router;
