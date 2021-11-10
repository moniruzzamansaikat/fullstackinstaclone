const { model, Types, Schema } = require("mongoose");
const timestamp = require("mongoose-timestamp");

const ConversationSchema = new Schema({
  sender: {
    type: String,
  },
  members: [{ tyep: Types.ObjectId }],
});

ConversationSchema.plugin(timestamp);
module.exports = model("Conversation", ConversationSchema);
