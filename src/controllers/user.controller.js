const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });
const { transporter, welcome } = require("../utils/mailer");

module.exports = {
  async register(req, res) {
    try {
      const { email, password, artistName, location, role } = req.body;
      const encPassword = await bcrypt.hash(
        password,
        Number(process.env.RENNALLA)
      );
      const user = await User.create({
        artistName,
        location,
        email,
        role,
        password: encPassword,
        picture:
          "https://res.cloudinary.com/crishood/image/upload/v1657132695/cld-sample-2.jpg",
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
          role: user.role,
        },
      });

      await transporter.sendMail(welcome(user));
    } catch (err) {
      res.status(400).json({ message: "User could not be registered" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Email or password not valid");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Email or password not valid !");
      }
      const token = jwt.sign({ id: user._id }, process.env.ORION, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User logged",
        data: {
          token,
          artistName: user.artistName,
          location: user.location,
          email: user.email,
          picture: user.picture,
          role: user.role,
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
      const user = await User.findById(userId).populate(
        "entries",
        "description",
        "media"
      );
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
      res.status(200).json({ message: "User updated" });
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
