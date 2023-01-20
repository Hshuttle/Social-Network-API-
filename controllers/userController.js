const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find().select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId }).select('-__v').populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new post
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findByIdAndUpdate({_id: req.params.userId},{$addToSet: {friends: req.params.friendId}},{new: true})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findByIdAndUpdate({_id: req.params.userId},{$pull: {friends: req.params.friendId}},{new: true})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findByIdAndRemove({_id: req.params.userId})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findByIdAndUpdate({_id: req.params.userId},{$set: req.body},{new: true, runValidators:true}).then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
  }
};
