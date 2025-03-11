const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { requireAuth } = require('../middleware/auth');
const {
  getWallpapers,
  getWallpaperById,
  uploadWallpaper,
  incrementDownload,
  getCategories
} = require('../controllers/wallpaperController');

// Get all wallpapers with pagination and filters
router.get('/', getWallpapers);

// Get categories - This must come before the :id route
router.get('/categories', getCategories);

// Get wallpaper by ID
router.get('/:id', getWallpaperById);

// Upload a new wallpaper
router.post('/', upload.single('image'), uploadWallpaper);

// Increment download count - Requires authentication
router.put('/:id/download', requireAuth, incrementDownload);

module.exports = router; 