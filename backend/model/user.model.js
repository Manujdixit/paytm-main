const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
    // trim: true,
    // lowercase: true,
    // minLength: 3,
    // maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    // minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    // trim: true,
    // maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    // trim: true,
    // maxLength: 30,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

//Export the model
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
