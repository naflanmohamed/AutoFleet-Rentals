import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary if credentials are provided
let useCloudinary = false;
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  useCloudinary = true;
}

// Local storage configuration
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadLocal = multer({ storage: localStorage });

// Middleware to handle file uploads and optionally upload to Cloudinary
export const upload = uploadLocal.fields([{ name: 'images', maxCount: 5 }]);

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL (Cloudinary), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // For local paths, return the path (will be served by static middleware)
  return imagePath;
};

// Middleware to process and upload to Cloudinary if configured
export const processImages = async (req, res, next) => {
  if (!useCloudinary || !req.files || !req.files.images) {
    // If no Cloudinary or no files, use local paths
    if (req.files && req.files.images) {
      req.body.images = req.files.images.map(file => `/uploads/${file.filename}`);
    }
    return next();
  }

  try {
    const uploadPromises = req.files.images.map(file => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file.path,
          {
            folder: 'autofleet-rentals',
            transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
          },
          (error, result) => {
            if (error) reject(error);
            else {
              // Delete local file after upload
              fs.unlinkSync(file.path);
              resolve(result.secure_url);
            }
          }
        );
      });
    });

    req.body.images = await Promise.all(uploadPromises);
    next();
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    next(error);
  }
};

