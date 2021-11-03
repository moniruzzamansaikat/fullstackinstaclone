const {
  Types: { ObjectId },
} = require("mongoose");
const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Notification = require("../models/Notification");
const { checkAuth } = require("../utils/checkAuth");
const { getToken } = require("../utils/jwt");

// get all suggested users
router.get("/suggestions", checkAuth, async (req, res) => {
  const users = await User.find({ _id: { $ne: req.userId } });
  res.json(users);
});

// get user by id
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// follow user
router.post("/follow", checkAuth, async (req, res) => {
  const { userId } = req.body;

  // push id to following
  const currentUser = await User.findByIdAndUpdate(
    req.userId,
    {
      $push: {
        following: userId,
      },
    },
    { new: true }
  );

  // push id on followers
  await User.findByIdAndUpdate(userId, {
    $push: {
      followers: req.userId,
    },
  });

  // make notification
  await Notification.create({
    text: `${currentUser.name} follows you`,
    user: req.userId,
  });

  const data = {
    token: getToken(currentUser),
  };
  res.json(data);
});

// unfollow people
router.post("/unfollow", checkAuth, async (req, res) => {
  const { userId } = req.body;

  // push id to following
  const currentUser = await User.findByIdAndUpdate(
    req.userId,
    {
      $pull: {
        following: userId,
      },
    },
    { new: true }
  );

  // push id on followers
  await User.findByIdAndUpdate(userId, {
    $pull: {
      followers: req.userId,
    },
  });

  const data = {
    token: getToken(currentUser),
  };
  res.json(data);
});

// fetch followers
router.get("/:id/followers", checkAuth, async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("followers")
    .populate("followers");

  if (user) return res.json(user.followers);
  res.json([]);
});

// fetch followers
router.get("/:id/following", checkAuth, async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("following")
    .select("following");

  if (user) return res.json(user.following);
  res.json([]);
});

// get all posts by user id
router.get("/:id/posts", checkAuth, async (req, res) => {
  const posts = await Post.find({ user: req.params.id });
  res.json(posts);
});

module.exports = router;
