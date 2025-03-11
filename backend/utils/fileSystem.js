const fs = require('fs');
const path = require('path');

/**
 * Ensures a directory exists, creating it if necessary
 * @param {string} dirPath - The directory path to check/create
 */
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

module.exports = {
  ensureDirectoryExists
}; 