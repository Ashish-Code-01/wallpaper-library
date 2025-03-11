/**
 * Dummy wallpaper data for the frontend
 * This is used when the API is not available or for development purposes
 */

export const dummyWallpapers = [
  {
    _id: 'dummy1',
    title: 'Mountain Landscape',
    description: 'Beautiful mountain landscape at sunset',
    category: 'Nature',
    tags: ['mountains', 'sunset', 'landscape'],
    resolution: '1920x1080',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    downloads: 42,
    uploadedAt: new Date('2023-01-15').toISOString()
  },
  {
    _id: 'dummy2',
    title: 'Cosmic Galaxy',
    description: 'Deep space galaxy with colorful nebula',
    category: 'Space',
    tags: ['galaxy', 'space', 'stars'],
    resolution: '3840x2160',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    downloads: 128,
    uploadedAt: new Date('2023-02-20').toISOString()
  },
  {
    _id: 'dummy3',
    title: 'Urban Cityscape',
    description: 'Modern city skyline at night',
    category: 'Urban',
    tags: ['city', 'skyline', 'night'],
    resolution: '2560x1440',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    downloads: 86,
    uploadedAt: new Date('2023-03-10').toISOString()
  },
  {
    _id: 'dummy4',
    title: 'Ocean Waves',
    description: 'Serene ocean waves on a tropical beach',
    category: 'Nature',
    tags: ['ocean', 'beach', 'waves'],
    resolution: '1920x1080',
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    downloads: 67,
    uploadedAt: new Date('2023-04-05').toISOString()
  },
  {
    _id: 'dummy5',
    title: 'Abstract Art',
    description: 'Colorful abstract digital artwork',
    category: 'Abstract',
    tags: ['abstract', 'art', 'colorful'],
    resolution: '2560x1440',
    imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    downloads: 54,
    uploadedAt: new Date('2023-05-12').toISOString()
  },
  {
    _id: 'dummy6',
    title: 'Minimalist Workspace',
    description: 'Clean and minimalist workspace setup',
    category: 'Minimalist',
    tags: ['workspace', 'minimal', 'clean'],
    resolution: '1920x1080',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    downloads: 39,
    uploadedAt: new Date('2023-06-18').toISOString()
  },
  {
    _id: 'dummy7',
    title: 'Autumn Forest',
    description: 'Colorful autumn forest with fallen leaves',
    category: 'Nature',
    tags: ['autumn', 'forest', 'leaves'],
    resolution: '3840x2160',
    imageUrl: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    downloads: 72,
    uploadedAt: new Date('2023-07-22').toISOString()
  },
  {
    _id: 'dummy8',
    title: 'Geometric Patterns',
    description: 'Modern geometric patterns and shapes',
    category: 'Abstract',
    tags: ['geometric', 'patterns', 'shapes'],
    resolution: '2560x1440',
    imageUrl: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    downloads: 48,
    uploadedAt: new Date('2023-08-30').toISOString()
  }
];

export const dummyCategories = [
  'Nature',
  'Space',
  'Urban',
  'Abstract',
  'Minimalist',
  'Animals'
];

export const categoryImages = {
  'Nature': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'Abstract': 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'Minimalist': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'Space': 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'Animals': 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'Urban': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
}; 