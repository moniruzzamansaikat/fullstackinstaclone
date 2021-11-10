const { Schema, Types, model } = require("mongoose");
const timestamp = require("mongoose-timestamp");

const MessageSchema = new Schema({
  members: [{ type: String }],
  // conversationId: {type: },
  sender: { type: String },
  text: { type: String, defalut: "" },
  seen: { type: Boolean, default: false },
});

MessageSchema.plugin(timestamp);
module.exports = model("Message", MessageSchema);
