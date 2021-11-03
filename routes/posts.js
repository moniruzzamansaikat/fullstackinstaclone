const router = require("express").Router();
const { uploadFiles, deleteFiles } = require("../utils/files");
const { checkAuth } = require("../utils/checkAuth");
const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");
const { getToken } = require("../utils/jwt");

// get
router.get("/", checkAuth, async (req, res) => {
  const posts = await Post.find({}, null, {
    sort: { createdAt: -1 },
  })
    .populate({ path: "user", select: "name _id photo" })
    .populate({ path: "comments.user", select: "name photo" })
    .populate({ path: "likes", select: "_id name" });

  res.json(posts);
});

// get all items
router.get("/save", checkAuth, async (req, res) => {
  const user = await User.findById(req.userId).populate("saved");
  if (user) {
    return res.json(user.saved);
  }
  res.json([]);
});

// get by id
router.get("/:id", checkAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({ path: "user", select: "name _id photo" })
      .populate({ path: "comments.user", select: "name photo" })
      .populate({ path: "likes", select: "_id name" });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ errors: ["Something went wrong!"] });
  }
});

// post
router.post("/", checkAuth, async (req, res) => {
  const { text } = req.body;
  const errors = [];

  // validate
  if (text?.trim().length === 0) errors.push("Please write some text!");

  if (errors.length === 0) {
    if (req.files) {
      uploadFiles(req.files, async (err, photos) => {
        const post = await Post.create({
          text,
          photos,
          user: req.userId,
        });
        const resPost = await Post.findById(post._id).populate("user");
        res.json(resPost);
      });
    }
  } else {
    return res.status(400).json({ errors });
  }
});

// todo: update by id
router.put("/:id", async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ errors: ["Something went wrong!"] });
  }
});

// delete by id
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  const foundPost = await Post.findById(id).lean(true);
  const publicIds = foundPost?.photos.map((photo) => photo.publicId);
  deleteFiles(publicIds, async (err, done) => {
    if (err) return res.status(500).json({ errors: ["Something is wrong!"] });
    else {
      const post = await Post.findOneAndRemove(id);
      res.json(post);
    }
  });
});

// like post
router.put("/:id/like", checkAuth, async (req, res) => {
  const postId = req.params.id;
  const user = await User.findById(req.userId).select("_id name");

  // increase like
  const post = await Post.findByIdAndUpdate(postId, {
    $push: {
      likes: req.userId,
    },
  });

  // create notification
  if (req.userId !== String(post?.user)) {
    const notif = await Notification.create({
      text: `${user.name} liked your post.`,
      user: req.userId,
      post: postId,
    });
  }

  res.json(user);
});

// dislike post
router.put("/:id/dislike", checkAuth, async (req, res) => {
  const postId = req.params.id;
  const user = await User.findById(req.userId).select("_id name");

  // decrease like
  const post = await Post.findByIdAndUpdate(postId, {
    $pull: {
      likes: req.userId,
    },
  });

  res.json(user);
});

// get all comments
router.get("/:id/comments", checkAuth, async () => {
  const postId = req.params.id;
  const post = await Post.findById(postId).select("comments");
  if (post) return res.json(post.comments);
  res.json([]);
});

// add comment

router.post("/:id/comments", checkAuth, async (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  const errors = [];

  // validate
  if (String(text).trim().length === 0) errors.push("Please write something!");

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: {
          text,
          user: req.userId,
        },
      },
    },
    { new: true }
  )
    .select("comments")
    .populate({ path: "comments.user", select: "name email photo _id" });

  if (post) return res.json(post.comments);
  res.json([]);
});

// save post new post
router.post("/:id/save", checkAuth, async (req, res) => {
  const { id: postId } = req.params;
  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    {
      $push: {
        saved: postId,
      },
    },
    { new: true }
  );

  res.json(postId);
});

// remove from saved
router.delete("/:id/save", checkAuth, async (req, res) => {
  const { id: postId } = req.params;
  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    {
      $pull: {
        saved: postId,
      },
    },
    { new: true }
  );

  res.json(postId);
});

module.exports = router;
