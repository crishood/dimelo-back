const mongoose = require("mongoose");

function connect() {
  const mongoUri = process.env.NOTHING_HERE_ATLAS;

  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () => {
    console.log("Mongo is alive!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Something went wrong!", err);
  });

  return mongoose.connection;
}

module.exports = { connect };
