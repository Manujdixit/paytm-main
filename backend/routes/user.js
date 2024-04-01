const express = require("express");
const zod = require("zod");
const router = express.Router();
const User = require("../model/user.model.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (success) {
    return res.json({ message: "Email already taken/ input invalid" });
  }
  const user = User.findone({ username: body.username });

  if (user._id) {
    return res.json({
      message: "Email already taken/ incorrect inputs",
    });
  }
  const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created succesfully",
    token: token,
  });
});

module.exports = router;

router.post("/signin", (req, res) => {
  const body = req.body;
  const user = User.findOne({ username: body.username });
  if (!user) {
    return res.json({ message: "User not found" });
  }
  const isPasswordValid = user.comparePassword(body.password);
  if (!isPasswordValid) {
    return res.json({ message: "Incorrect password" });
  }
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "User logged in successfully",
    token: token,
  });
});
