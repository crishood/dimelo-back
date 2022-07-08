const { Schema, model } = require("mongoose");

const entrySchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      required: false,
    },
    user: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Entry = model("Entry", entrySchema);

module.exports = Entry;
