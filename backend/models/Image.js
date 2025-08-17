const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  url: String,
  type: String, // image / video
});

const imageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // custom id based on name
  name: { type: String, required: true },
  cover: { type: String, required: true },
  images: [mediaSchema],
});

module.exports = mongoose.model("Image", imageSchema);
