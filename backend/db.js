const mongoose = require("mongoose");

const db = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log("db connected succesfully");
  } catch (error) {
    console.log(error, "db connection failed");
  }
};
module.exports = db;
