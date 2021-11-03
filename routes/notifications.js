const router = require("express").Router();
const { checkAuth } = require("../utils/checkAuth");
const Notification = require("../models/Notification");

// get all notifications
router.get("/", checkAuth, async (req, res) => {
  const notifications = await Notification.find({ user: req.userId }).populate(
    "user"
  );
  res.json(notifications);
});

module.exports = router;
