const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const db = require("./db");

const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

db();

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

//api/v1/user/signup
//api/v1/user/signin
//api/v1/user/changepassword...

//api/v1/account/transferMoney
//api/v1/account/balance
