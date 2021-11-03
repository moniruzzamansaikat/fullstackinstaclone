const { Schema, model, Types } = require("mongoose");
const timestamp = require("mongoose-timestamp");

const PostSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  photos: [
    {
      url: String,
      publicId: String,
    },
  ],
  text: {
    type: String,
    trim: true,
  },
  likes: {
    type: [{ type: Types.ObjectId, ref: "User" }],
    default: [],
  },
  comments: [
    {
      text: String,
      user: {
        type: Types.ObjectId,
        ref: "User",
      },
      likes: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// plugins
PostSchema.plugin(timestamp);

module.exports = model("Post", PostSchema);
