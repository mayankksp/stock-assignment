const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  id: { type: String, default: null },
  source: { type: String, default: "local" },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
