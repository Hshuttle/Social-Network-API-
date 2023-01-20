const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction, 
  updateThought
} = require("../../controllers/thoughtController");
router.route("/").get(getThoughts).post(createThought);
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);
router.route("/").get(getThoughts);
router.route("/:userId/thoughts/:thoughtId").put(addReaction).delete(removeReaction)

module.exports = router;
