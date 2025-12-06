import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const res = await axios.get(`/api/vehicles/${id}`);
      setVehicle(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      toast.error('Failed to load vehicle details');
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      toast.info('Please login to book a vehicle');
    } else {
      navigate(`/checkout/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle not found</h2>
          <Link to="/vehicles" className="text-primary-600 hover:underline">Return to listings</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/vehicles" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-8 transition-colors group">
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
          Back to Fleet
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="p-8 bg-gray-100">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg mb-4 group">
                {vehicle.images && vehicle.images.length > 0 ? (
                  <img
                    src={vehicle.images[selectedImage]}
                    alt={vehicle.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
              </div>

              {vehicle.images && vehicle.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {vehicle.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${selectedImage === idx ? 'border-primary-600 ring-2 ring-primary-600/20' : 'border-transparent hover:border-gray-300'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${vehicle.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details Panel */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-dark-900 font-display mb-2">{vehicle.title}</h1>
                    <div className="flex items-center space-x-4 text-gray-500">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{vehicle.brand}</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{vehicle.model}</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{vehicle.year}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-primary-600">${vehicle.pricePerDay}</p>
                    <p className="text-gray-500 text-sm">per day</p>
                  </div>
                </div>

                <div className="prose prose-lg text-gray-600 mb-8">
                  <h3 className="text-xl font-bold text-dark-900 mb-3">Description</h3>
                  <p className="leading-relaxed">{vehicle.description || 'No description available.'}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="text-gray-500 text-sm block mb-1">Category</span>
                    <span className="text-dark-900 font-bold capitalize">{vehicle.category?.name || 'N/A'}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="text-gray-500 text-sm block mb-1">Availability</span>
                    <span className={`font-bold ${vehicle.availability ? 'text-green-600' : 'text-red-600'}`}>
                      {vehicle.availability ? 'Available Now' : 'Currently Unavailable'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <button
                  onClick={handleBookNow}
                  disabled={!vehicle.availability}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${vehicle.availability
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-primary-600/30'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  {vehicle.availability ? 'Book This Vehicle' : 'Not Available'}
                </button>
                <p className="text-center text-gray-400 text-sm mt-4">
                  Free cancellation up to 24 hours before pickup
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;

