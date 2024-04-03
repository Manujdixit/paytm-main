const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User, Account } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middlewares/auth.middleware");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.get("/", (req, res) => {
  return res.json({ message: "server started" });
});

router.post("/signup", async (req, res) => {
  try {
    const { success, error } = signupSchema.safeParse(req.body);

    console.log("validation result:", success, error);

    if (!success) {
      return res
        .status(411)
        .json({ message: "Email already taken/ input invalid" });
    }
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(409).json({
        message: "incorrect inputs",
        error,
      });
    }
    const body = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;

    const user = await User.create({
      username: body.username,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
    });

    const userId = user._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.status(200).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error in signup", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/", async (req, res) => {
  try {
    const { success, error } = signinBody.safeParse(req.body);
    console.log("validation result:", success, error);
    if (!success) {
      return res.status(400).json({ message: "Input invalid" });
    }
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error in signup", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

const updateUserSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  try {
    const body = req.body;
    const { success, data } = updateUserSchema.safeParse(body);
    if (!success) {
      return res.status(400).json({ message: "Input invalid" });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //if password is provided , hash it before updating
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, data, {
      new: true,
    });
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in signup", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//route to get users from the backend via firstname/lastname
// reference:
// https://stackoverflow.com/questions/7382207/mongooses-find-method-with-or-condition-does-not-work-properly
// https://stackoverflow.com/questions/3305561/how-to-query-mongodb-with-like
router.get("/bulk", async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter } },
        { lastName: { $regex: filter } },
      ],
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "Not Found: No users found" });
    }

    res.status(200).json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
