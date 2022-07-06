const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    artistName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [
        {
          validator(value) {
            return models.User.findOne({ email: value })
              .then((user) => !user)
              .catch(() => false);
          },
          message: "This email already exists",
        },
      ],
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    links: {
      type: [String],
    },
    followers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    following: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
