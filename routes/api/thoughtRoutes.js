const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction
} = require("../../controllers/thoughtController");
router.route("/").get(getThoughts).post(createThought);
router.route("/:thoughtId").get(getSingleThought);
router.route("/").get(getThoughts).post(deleteThought);
router.route("/:userId/thoughts/:thoughtId").put(addReaction).delete(removeReaction)

module.exports = router;
