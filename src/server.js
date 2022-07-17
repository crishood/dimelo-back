const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("./db");
const userRouter = require("./routes/user");
const entryRouter = require("./routes/entry");
require("dotenv").config();
const { transporter, verify } = require("./utils/mailer");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
connect();
//verify(transporter);

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/entries", entryRouter);

app.listen(PORT, () => {
  console.log("Let's do this sh!t homie");
});
