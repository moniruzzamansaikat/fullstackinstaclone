const { Schema, Types, model } = require("mongoose");
const timestamp = require("mongoose-timestamp");

const MessageSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User" },
  to: { type: Types.ObjectId, ref: "User" },
  text: { type: String, defalut: "" },
  seen: { type: Boolean, default: false },
});

MessageSchema.plugin(timestamp);
module.exports = model("Message", MessageSchema);
