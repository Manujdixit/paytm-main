const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { Account } = require("../model/user.model");
const { default: mongoose } = require("mongoose");
const { Transaction } = require("../model/user.model");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });
    if (!account) {
      // console.log("Account not found for user ID:", req.userId);
      return res.status(404).json({ message: "Not Found: Account not found" });
    }
    // console.log("Account balance retrieved successfully");
    res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    console.error("Error fetching account balance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    // console.log("manuj", to);

    //fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.json({ message: "User not found" });
    }

    //perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    //save the transaction
    const transaction = new Transaction({
      senderId: req.userId,
      receiverId: to,
      amount: amount,
    });
    await transaction.save({ session: session });

    //commit the transaction
    await session.commitTransaction();
    res.json({ message: "Transfer successful" });
  } catch (error) {
    // console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/transactions", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    //find transactions where current user is either sender or reciever
    const transactions = await Transaction.find({
      $or: [{ senderId: req.userId }, { receiverId: req.userId }],
    }).populate("senderId receiverId", "username firstName lastName");

    if (!transactions || transactions.length === 0) {
      // console.log("no transactions");
      return res.json({ transactions: [] });
    }
    res.json({ transactions });
  } catch (error) {
    console.error("Error fetching trnasactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
