const Conversation = require("../models/Conversation");

const router = require("express").Router();

// create new converstation
router.post("/", async (req, res) => {
  try {
    const conversation = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    res.json(conversation);
  } catch (error) {
    res.json({ errors: "something went wrong" });
  }
});

module.exports = router;
