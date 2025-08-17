// backend/models/Image.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  cover: { type: String, required: true },
  images: [
    {
      url: String,
      type: String, // 'image' or 'video'
    },
  ],
});

module.exports = mongoose.model("Image", imageSchema);
