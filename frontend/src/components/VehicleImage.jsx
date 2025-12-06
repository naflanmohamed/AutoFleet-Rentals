import { useState } from 'react';
import { getImageUrl } from '../utils/imageUtils';

const VehicleImage = ({ src, alt, className, fallback = '/placeholder-car.jpg' }) => {
  const [imgSrc, setImgSrc] = useState(getImageUrl(src));
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  if (!src && !fallback) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400">No image</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc || fallback}
      alt={alt || 'Vehicle'}
      className={className}
      onError={handleError}
    />
  );
};

export default VehicleImage;

