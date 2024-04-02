const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const db = require("./db");
const PORT = 4001;
const cors = require("cors");

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
