const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

module.exports = {
  async register(req, res) {
    try {
      const { email, password, artistName, location } = req.body;
      const encPassword = await bcrypt.hash(
        password,
        Number(process.env.RENNALLA)
      );
      const user = await User.create({
        artistName,
        location,
        email,
        password: encPassword,
        picture:
          "https://res.cloudinary.com/clontrello/image/upload/v1654708527/samples/animals/reindeer.jpg",
      });

      const token = jwt.sign({ id: user._id }, process.env.ORION, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User created",
        data: {
          token,
          artistName: user.artistName,
          location: user.location,
          email: user.email,
          picture: user.picture,
        },
      });

      //await transporter.sendMail(welcome(user));
    } catch (err) {
      res.status(400).json({ message: "User could not be registered" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User or password not valid");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("User or password not valid !");
      }
      const token = jwt.sign({ id: user._id }, process.env.ORION, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User logged",
        data: {
          token,
          name: user.name,
          artistName: user.artistName,
          location: user.location,
          email: user.email,
          picture: user.picture,
        },
      });
    } catch (err) {
      res.status(400).json({ message: `User could not login: error: ${err}` });
    }
  },

  async list(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ message: "Users found", data: users });
    } catch (err) {
      res.status(404).json({ message: "Users not found" });
    }
  },

  async show(req, res) {
    try {
      const userId = req.user;
      const user = await User.findById(userId);
      res.status(200).json({ message: "User found", data: user });
    } catch (err) {
      res.status(404).json({ message: "User not found" });
    }
  },

  async update(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.status(200).json({ message: "User update" });
    } catch (err) {
      res.status(400).json({ message: "User could not be updated", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User destroyed", data: user });
    } catch (err) {
      res
        .status(400)
        .json({ message: "User could not be destroyed", data: err });
    }
  },
};
