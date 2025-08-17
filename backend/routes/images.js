const express = require("express");
const router = express.Router();
const cloudinary = require("../cloudinary");
const Image = require("../models/Image");

// POST /api/images/upload
router.post("/upload", async (req, res) => {
  try {
    const { name, cover, folder } = req.body;

    // Generate slug-like id from name
    const id = name.trim().toLowerCase().replace(/\s+/g, "-");

    // Fetch all media from Cloudinary folder
    const result = await cloudinary.search
      .expression(`folder:"${folder}"`)
      .sort_by("public_id", "asc")
      .max_results(100)
      .execute();

    // Map to { url, type }
    const allMedia = result.resources.map((item) => ({
      url: item.secure_url,
      type: item.resource_type, // 'image' or 'video'
    }));

    // Filter out cover from media array
    const filteredMedia = allMedia.filter((item) => item.url !== cover);

    // Save to MongoDB
    const imageData = new Image({
      id,
      name,
      cover,
      images: filteredMedia,
    });

    await imageData.save();

    console.log("✅ Data saved to MongoDB:");
    console.log(JSON.stringify(imageData, null, 2));

    res.status(201).json({ message: "✅ Folder imported and saved!" });
  } catch (error) {
    console.error("❌ Error uploading folder:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /api/images - get all entries
router.get("/", async (req, res) => {
  try {
    const data = await Image.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET /api/images/:id - get single item by id
router.get("/:id", async (req, res) => {
  try {
    const data = await Image.findOne({ id: req.params.id });
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
