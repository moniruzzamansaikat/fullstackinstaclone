const router = require("express").Router();
const { checkAuth } = require("../utils/checkAuth");
const Notification = require("../models/Notification");

// get all notifications
router.get("/", checkAuth, async (req, res) => {
  const notifications = await Notification.find({ user: req.userId }).populate(
    "notifUser"
  );
  res.json(notifications);
});

// seen notificaiton
router.put("/:id/seen", checkAuth, async (req, res) => {
  const notif = await Notification.findByIdAndUpdate(
    req.params.id,
    {
      $set: { seen: true },
    },
    { new: true }
  );
  res.json(notif);
});

// delete notification
router.delete("/:id", checkAuth, async (req, res) => {
  await Notification.findByIdAndRemove(req.params.id);
  res.json(req.params.id);
});

module.exports = router;
