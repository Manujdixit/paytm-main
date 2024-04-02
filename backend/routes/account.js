const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { User } = require("../model/user.model");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await User.Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

//without transactions

// router.post("/transfer", authMiddleware, async (req, res) => {
//   const { amount, to } = req.body;

//   const account = await User.Account.findOne({ userId: req.userId });
//   if (account.balance < amount) {
//     return res.json({ message: "Insufficient balance" });
//   }

//   const toAccount = await User.Account.findOne({ userId: to });
//   if (!toAccount) {
//     return res.json({ message: "User not found" });
//   }

//   await User.Account.updateOne(
//     {
//       userId: req.userId,
//     },
//     {
//       $inc: {
//         balance: -amount,
//       },
//     }
//   );

//   await User.Account.updateOne(
//     {
//       userId: to,
//     },
//     {
//       $inc: {
//         balance: amount,
//       },
//     }
//   );
//   res.json({ message: "Transfer successful" });
// });

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  const { amount, to } = req.body;

  //fetch the accounts within the transaction
  const account = await User.Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.json({ message: "Insufficient balance" });
  }

  const toAccount = await User.Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.json({ message: "User not found" });
  }
  //perform the transfer
  await User.Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await User.Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  //commit the transaction
  await session.commitTransaction();
  res.json({ message: "Transfer successful" });
});

module.exports = router;
