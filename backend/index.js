// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { seedWallpapers } = require('./utils/seedData');

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB()
  .then(() => {
    // Seed the database with dummy data
    return seedWallpapers();
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
  });

// Routes
app.use('/api/wallpapers', require('./routes/wallpaperRoutes'));


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 