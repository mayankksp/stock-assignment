const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lasttname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  message: { type: String, required: true },
  id: { type: String, default: null },
  source: { type: String, default: "local" },
});

const FeedbackModel = mongoose.model("Feed", FeedbackSchema);

module.exports = FeedbackModel;
