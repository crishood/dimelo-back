const Entry = require("../models/entry.model");
const User = require("../models/user.model");

module.exports = {
  async list(req, res) {
    const userId = req.user;
    try {
      const currentUser = await User.findById(userId);
      const following = currentUser.following.map((item) => item.toString());

      console.log(following);
      console.log(userId);
      const entries = await Entry.find({
        $or: [{ user: following }, { user: userId }],
      }).populate("user", "artistName picture role");
      res.status(200).json({ message: "Entries found", data: entries });
    } catch (err) {
      res.status(404).json({ message: "Entries not found" });
    }
  },
  async listProfile(req, res) {
    try {
      const userId = req.user;
      const entries = await Entry.find({ user: userId }).populate(
        "user",
        "artistName picture role"
      );
      res.status(200).json({ message: "Entries found", data: entries });
    } catch (err) {
      res.status(404).json({ message: "Entries not found" });
    }
  },

  async show(req, res) {
    try {
      const { entryId } = req.params;
      const entry = await Entry.findById(entryId);
      res.status(200).json({ message: "Entry found", data: entry });
    } catch (err) {
      res.status(404).json({ message: "Entry not found" });
    }
  },

  async create(req, res) {
    try {
      const userId = req.user;
      const entry = await Entry.create({ ...req.body, user: userId });
      const user = await User.findById(userId);
      user.entries.push(entry);
      user.save({ validateBeforeSave: false });
      res.status(201).json({ message: "Entry created", data: entry });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Entry could not be created", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { entryId } = req.params;
      const entry = await Entry.findByIdAndDelete(entryId);
      res.status(200).json({ message: "Entry destroyed", data: entry });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Entry could not be destroyed", data: err });
    }
  },
};
