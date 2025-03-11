const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

/**
 * Uploads an image buffer to Cloudinary
 * @param {Buffer} buffer - The image buffer
 * @param {string} folder - Optional folder to store the image in
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadImage = (buffer, folder = 'wallpapers') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Convert buffer to stream and pipe to uploadStream
    const readableStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      }
    });

    readableStream.pipe(uploadStream);
  });
};

module.exports = {
  uploadImage
}; 