const router = require("express").Router();
const User = require("../models/User");
const { checkAuth } = require("../utils/checkAuth");
const { uploadSingle } = require("../utils/files");
const { getToken } = require("../utils/jwt");

// check auth
router.get("/check", checkAuth, async (req, res) => {
  if (req.userId) {
    const user = await User.findById(req.userId);
    return res.status(200).json(user);
  }

  return res.status(403).send("Unauthorized");
});

// logut user
router.post("/logout", checkAuth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.userId, {
    $set: {
      lastLogin: new Date(),
    },
  });

  res.send("You are logged out!");
});

// register
router.post("/register", async (req, res) => {
  try {
    const errors = [];
    const { name, email, password, password1 } = req.body;
    if (name?.trim().length === 0) errors.push("Name is required");
    if (email?.trim().length === 0) errors.push("Email is required");
    if (password?.trim().length === 0) errors.push("Password is required");
    if (password?.trim().length < 6)
      errors.push("Password must be at least 6 characters long");
    if (password?.trim() !== password1?.trim())
      errors.push("Password don't match");

    // if email already signed in
    const foundUser = await User.findOne({ email }).lean();
    if (foundUser) {
      errors.push("Email is already signed in!");
    }

    // no erros
    if (errors.length === 0) {
      const user = await User.create({
        name,
        email,
        password,
      });

      const token = getToken({ _id: user?._id });
      return res.json({ token, user });
    } else {
      return res.status(400).json({ errors });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// login
router.post("/login", async (req, res) => {
  const errors = [];
  const { email, password } = req.body;
  if (email?.trim().length === 0) errors.push("Email is required");
  if (password?.trim().length === 0) errors.push("Password is required");

  // check for email on db
  const userWithEmail = await User.findOne({ email });

  if (!userWithEmail) errors.push("No account with this email!");

  // check password
  const validPwd = await userWithEmail?.validatePassword(password);
  if (!validPwd) errors.push("Password is not valid!");

  // all is ok : login now
  if (errors.length === 0) {
    const token = getToken({ _id: userWithEmail._id });
    return res.json({ token, user: userWithEmail });
  } else {
    return res.status(400).json({ errors });
  }
});

// update user data
router.put("/update", checkAuth, async (req, res) => {
  const { name, email, bio, gender } = req.body;
  console.log({ gender });
  const errors = [];

  const anotherUserFound = await User.findOne({ email });

  if (req?.files?.photo) {
    const photo = await uploadSingle(req.files.photo);
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          name,
          email,
          photo,
          bio,
        },
      },
      {
        new: true,
      }
    ).select("_id");

    const token = getToken(user.toJSON());
    return res.json({
      user,
      token,
    });
  } else {
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          name,
          email,
          bio,
          gender,
        },
      },
      {
        new: true,
      }
    ).select("_id");

    const token = getToken(user.toJSON());
    return res.json({
      user,
      token,
    });
  }
});

// update contact info
router.put("/contact", checkAuth, async (req, res) => {
  const { homeTown, currentCity, highSchool, relation, birthday } = req.body;
  const errors = [];
  if (!homeTown.trim().length) errors.push("Home town is required!");
  if (!currentCity.trim().length) errors.push("Current city is required!");
  if (!highSchool.trim().length) errors.push("High school is required!");
  if (!relation.trim().length) errors.push("Relationship is required!");
  if (!birthday?.trim().length) errors.push("Date of birth is required!");

  const user = await User.findByIdAndUpdate(
    req.userId,
    {
      $set: {
        homeTown,
        currentCity,
        highSchool,
        relation,
        birthday,
      },
    },
    {
      new: true,
    }
  );

  res.json(user);
});

module.exports = router;
