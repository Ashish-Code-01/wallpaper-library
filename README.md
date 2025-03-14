# Creative Wallpaper Library

A modern, responsive wallpaper library application built with React.js and Node.js. This application allows users to browse, search, filter, and download high-quality wallpapers for their devices.

## Features

- **Browse Wallpapers**: Explore a collection of high-quality wallpapers
- **Categories**: Filter wallpapers by categories
- **Search**: Find wallpapers using keywords
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Authentication**: User authentication required for downloads and uploads
- **Download**: Easily download wallpapers in their original resolution
- **Upload**: Contribute to the collection by uploading your own wallpapers
- **Sorting**: Sort wallpapers by newest or most downloaded
- **Cloud Storage**: Images are stored in Cloudinary for optimized delivery

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Styled Components for styling
- Axios for API requests
- React Icons
- Clerk for authentication

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Cloudinary for image storage and optimization
- Multer for handling file uploads
- Clerk SDK for authentication verification

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (free tier available)
- Clerk account (free tier available)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/wallpaper-library.git
cd wallpaper-library
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Install frontend dependencies
```
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string

# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Clerk configuration
CLERK_SECRET_KEY=your_clerk_secret_key
```

5. Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Running the Application

1. Start the backend server
```
cd backend
npm run dev  # or 'node index.js' if dev script is not set up
```

2. Start the frontend development server
```
cd ../frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment

The application is deployed and accessible at:
- Frontend: `https://wallpaper-library.vercel.app` (example)
- Backend API: `https://wallpaper-library.onrender.com`

## Project Structure

```
wallpaper-library/
├── backend/                # Node.js backend
│   ├── config/             # Configuration files
│   │   ├── db.js           # MongoDB connection
│   │   └── cloudinary.js   # Cloudinary configuration
│   ├── controllers/        # Route controllers
│   │   └── wallpaperController.js
│   ├── middleware/         # Middleware functions
│   │   ├── auth.js         # Authentication middleware
│   │   └── upload.js       # Multer configuration
│   ├── models/             # Mongoose models
│   │   └── Wallpaper.js    # Wallpaper schema
│   ├── routes/             # API routes
│   │   └── wallpaperRoutes.js
│   ├── utils/              # Utility functions
│   │   ├── cloudinaryUploader.js  # Cloudinary upload helper
│   │   ├── fileSystem.js   # File system helpers
│   │   └── seedData.js     # Database seeding
│   ├── index.js            # Main server file
│   └── package.json        # Backend dependencies
│
└── frontend/               # React.js frontend
    ├── public/             # Static files
    ├── src/                # Source code
    │   ├── components/     # Reusable components
    │   │   ├── AuthComponents.js  # Authentication components
    │   │   └── ...         # Other components
    │   ├── pages/          # Page components
    │   ├── utils/          # Utility functions
    │   │   └── dummyData.js # Fallback data
    │   ├── assets/         # Images, fonts, etc.
    │   ├── App.js          # Main App component
    │   └── index.js        # Entry point
    └── package.json        # Frontend dependencies
```

## API Endpoints

- `GET /api/wallpapers` - Get all wallpapers (with pagination and filters)
- `GET /api/wallpapers/:id` - Get a specific wallpaper by ID
- `POST /api/wallpapers` - Upload a new wallpaper (requires authentication)
- `PUT /api/wallpapers/:id/download` - Increment download count (requires authentication)
- `GET /api/categories` - Get all categories

## Authentication with Clerk

This application uses Clerk for user authentication and authorization. Key features:

- **Protected Routes**: Certain pages (like Upload) are only accessible to authenticated users
- **Protected Actions**: Downloads require authentication
- **Secure Token Management**: Clerk handles secure token generation and storage
- **User Management**: Create and manage user accounts through Clerk's dashboard
- **Social Login**: Optional integration with social providers

To set up Clerk:

1. Create a free account at [clerk.com](https://clerk.com)
2. Create a new application in the Clerk dashboard
3. Get your Publishable Key and Secret Key from the API Keys section
4. Add these to your `.env` files as shown in the installation instructions

### Authentication Flow

1. Users can browse wallpapers without authentication
2. When attempting to download a wallpaper, users are prompted to sign in
3. After authentication, the download proceeds with the proper authorization
4. Upload page is fully protected, redirecting unauthenticated users to sign in
5. Authentication state persists across sessions through secure storage

## Cloudinary Integration

This application uses Cloudinary for storing and serving wallpaper images. Benefits include:

- **Optimized Image Delivery**: Images are automatically optimized and served via CDN
- **Transformations**: Images can be resized, cropped, and transformed on-the-fly
- **Responsive Images**: Deliver appropriately sized images to different devices
- **Cost-Effective**: Free tier available for smaller collections
- **Reliability**: Cloud storage with backups and redundancy

To set up Cloudinary:

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and API secret from the dashboard
3. Add these to your `.env` file as shown in the installation instructions

## Error Handling

The application includes fallback mechanisms:

- **Offline Mode**: Frontend includes dummy data when API is unavailable
- **Error Boundaries**: Prevents entire app crash on component errors
- **Proper Validation**: Both client and server-side validation for uploads
- **Authentication Errors**: Graceful handling of authentication failures

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Clerk](https://clerk.com/) for authentication services
- [Cloudinary](https://cloudinary.com/) for image storage and optimization
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set
- [Styled Components](https://styled-components.com/) for the styling solution
- [Render](https://render.com/) for backend hosting