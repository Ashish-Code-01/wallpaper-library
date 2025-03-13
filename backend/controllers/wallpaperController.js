const Wallpaper = require('../models/Wallpaper');
const { uploadImage } = require('../utils/cloudinaryUploader');

// Get all wallpapers with pagination and filters
const getWallpapers = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, search } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const wallpapers = await Wallpaper.find(query)
      .sort({ uploadedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const totalWallpapers = await Wallpaper.countDocuments(query);

    res.json({
      wallpapers,
      totalPages: Math.ceil(totalWallpapers / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching wallpapers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get wallpaper by ID
const getWallpaperById = async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findById(req.params.id);
    if (!wallpaper) {
      return res.status(404).json({ message: 'Wallpaper not found' });
    }
    res.json(wallpaper);
  } catch (error) {
    console.error('Error fetching wallpaper:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload a new wallpaper
const uploadWallpaper = async (req, res) => {
  try {
    const { title, description, category, tags, resolution } = req.body;
    const userId = req.auth?.userId;

    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Upload image to Cloudinary
    const cloudinaryResult = await uploadImage(req.file.buffer);

    // Create new wallpaper with Cloudinary URL
    const newWallpaper = new Wallpaper({
      title,
      description,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Filter out empty tags
      resolution,
      imageUrl: cloudinaryResult.secure_url,
      userId: userId
    });

    await newWallpaper.save();
    res.status(201).json(newWallpaper);
  } catch (error) {
    console.error('Error uploading wallpaper:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Increment download count
const incrementDownload = async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!wallpaper) {
      return res.status(404).json({ message: 'Wallpaper not found' });
    }

    res.json(wallpaper);
  } catch (error) {
    console.error('Error updating download count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get categories
const getCategories = async (req, res) => {
  try {
    const categories = await Wallpaper.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getWallpapers,
  getWallpaperById,
  uploadWallpaper,
  incrementDownload,
  getCategories
}; 