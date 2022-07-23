const { Schema, model } = require("mongoose");

const entrySchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
    audio: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Entry = model("Entry", entrySchema);

module.exports = Entry;
