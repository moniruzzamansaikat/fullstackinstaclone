const { Schema, model, Types } = require("mongoose");
const timestamp = require("mongoose-timestamp");

const NotificationSchema = new Schema({
  text: { type: String, default: "" },
  seen: { type: Boolean, default: false },
  type: { type: String },
  user: { type: Types.ObjectId, ref: "User" },
  post: { type: Types.ObjectId, ref: "Post" },
  notifUser: { type: Types.ObjectId, ref: "User" },
});

// plugins
NotificationSchema.plugin(timestamp);

module.exports = model("Notification", NotificationSchema);
