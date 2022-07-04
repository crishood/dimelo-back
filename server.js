const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log("Let's do this sh!t homie");
});
