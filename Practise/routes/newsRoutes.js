const express = require("express");
const News = require("../models/newsModel");
const router = express.Router();

// Create news article
router.post("/", async (req, res) => {
  try {
    const { title, content, author, coverImage, tags } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const news = await News.create({ title, slug, content, author, coverImage, tags });

    res.status(201).json(news);
  } catch (error) {
    console.error("Error creating news:", error); // <-- Debugging log
    res.status(500).json({ message: "Error creating news", error });
  }
});


// Get all news
router.get("/", async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
});

// Get single news by slug
router.get("/:slug", async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
});

module.exports = router;
