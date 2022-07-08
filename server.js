const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("./src/db");
require("dotenv").config({ path: "./.env" });
const { transporter, verify } = require("./src/utils/mailer");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
connect();
verify(transporter);

app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log("Let's do this sh!t homie");
});
