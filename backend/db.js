const mongoose = require("mongoose");

const db = () => {
  try {
    const conn = mongoose.connect(
      "mongodb+srv://manujdxt:manuj@cluster0.fozbcmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("db connected succesfully");
  } catch (error) {
    console.log(error, "db connection failed");
  }
};
module.exports = db;
