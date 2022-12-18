const { Schema, model } = require("mongoose");

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      validate: thoughtValidator,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // getter to format timestamp
    },
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: "Username",
      },
    ],
    // reactions
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

var thoughtValidator = [
  validate({
    validator: "isLength",
    arguments: [1, 280],
    message: "Name should be between 1 and 280 characters",
  }),
];

thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return `${this.reaction.length}`;
  });

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
