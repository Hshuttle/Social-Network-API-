const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now()
      // getter to format timestamp
    },
    username: {
      type: String,
      required: true
    },

    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return `${this.reaction.length}`;
  });

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
