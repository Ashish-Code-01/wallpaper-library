const mongoose = require('mongoose');

const wallpaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  tags: [String],
  resolution: { type: String, required: true },
  imageUrl: { type: String, required: true },
  downloads: { type: Number, default: 0 }, 
  uploadedAt: { type: Date, default: Date.now },
  userId: { type: String }
});

const Wallpaper = mongoose.model('Wallpaper', wallpaperSchema);

module.exports = Wallpaper; 