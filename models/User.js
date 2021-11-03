const { Schema, model, Types } = require("mongoose");
const timeStamp = require("mongoose-timestamp");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, trim: true },
  email: { type: String, trim: true },
  bio: { type: String, default: "", trim: true },
  password: String,
  photo: {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
  },
  followers: [{ type: Types.ObjectId, ref: "User" }],
  following: [{ type: Types.ObjectId, ref: "User" }],
  posts: [{ type: Types.ObjectId, ref: "Post" }],
  saved: [{ type: Types.ObjectId, ref: "Post" }],
});

UserSchema.plugin(timeStamp);

// hash password
UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// check password
UserSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
