/**
 * Get the full image URL
 * Handles both Cloudinary URLs and local upload paths
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL (Cloudinary or external), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a local path starting with /uploads, return as is (Vite proxy will handle)
  if (imagePath.startsWith('/uploads')) {
    return imagePath;
  }
  
  // If it doesn't start with /, add /uploads prefix
  if (!imagePath.startsWith('/')) {
    return `/uploads/${imagePath}`;
  }
  
  // Return as is
  return imagePath;
};

