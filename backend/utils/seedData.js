const Wallpaper = require('../models/Wallpaper');

/**
 * Seeds the database with dummy wallpaper data
 */
const seedWallpapers = async () => {
  try {
    // Check if we already have wallpapers
    const count = await Wallpaper.countDocuments();
    
    if (count > 0) {
      console.log(`Database already has ${count} wallpapers, skipping seed`);
      return;
    }
    
    console.log('Seeding database with dummy wallpapers...');
    
    // Define some dummy data with Cloudinary sample images
    const dummyWallpapers = [
      {
        title: 'Mountain Landscape',
        description: 'Beautiful mountain landscape at sunset',
        category: 'Nature',
        tags: ['mountains', 'sunset', 'landscape'],
        resolution: '1920x1080',
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        downloads: 42
      },
      {
        title: 'Cosmic Galaxy',
        description: 'Deep space galaxy with colorful nebula',
        category: 'Space',
        tags: ['galaxy', 'space', 'stars'],
        resolution: '3840x2160',
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1616526331/samples/landscapes/nature-mountains.jpg',
        downloads: 128
      },
      {
        title: 'Urban Cityscape',
        description: 'Modern city skyline at night',
        category: 'Urban',
        tags: ['city', 'skyline', 'night'],
        resolution: '2560x1440',
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1616526331/samples/landscapes/architecture-signs.jpg',
        downloads: 86
      },
      {
        title: 'Ocean Waves',
        description: 'Serene ocean waves on a tropical beach',
        category: 'Nature',
        tags: ['ocean', 'beach', 'waves'],
        resolution: '1920x1080',
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1616526331/samples/landscapes/beach-boat.jpg',
        downloads: 67
      },
      {
        title: 'Abstract Art',
        description: 'Colorful abstract digital artwork',
        category: 'Abstract',
        tags: ['abstract', 'art', 'colorful'],
        resolution: '2560x1440',
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1616526331/samples/animals/three-dogs.jpg',
        downloads: 54
      }
    ];
    
    // Insert the documents
    await Wallpaper.insertMany(dummyWallpapers);
    
    console.log(`Successfully seeded ${dummyWallpapers.length} wallpapers`);
  } catch (error) {
    console.error('Error seeding wallpapers:', error);
  }
};

module.exports = { seedWallpapers }; 