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
    },
  ],
});

// plugins
PostSchema.plugin(timestamp);

module.exports = model("Post", PostSchema);
