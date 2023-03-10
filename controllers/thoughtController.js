const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new post
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        ).then((userData) => {
          if (!userData) {
            return res.status(404).json({ msg: "No user found" });
          }
          res.json(userData);
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findByIdAndUpdate({_id: req.params.thoughtId},{$set:req.body},{new:true, runValidators: true})
      .then((thoughtData) => {
      res.json(thoughtData)
      }).catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          { $pull: { thoughts: thoughtData._id } },
          { new: true }
        ).then((userData) => {
          if (!userData) {
            return res.status(404).json({ msg: "No user found" });
          }
          res.json(userData);
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findByIdAndUpdate({_id: req.params.userId},{$addToSet: {reactions: req.params.friendId}},{new: true})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thought.findByIdAndUpdate({_id: req.params.userId},{$pull: {reactions: req.params.friendId}},{new: true})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
};
