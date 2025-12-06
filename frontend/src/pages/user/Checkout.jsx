import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format, differenceInDays, addDays } from 'date-fns';

const Checkout = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [formData, setFormData] = useState({
    startDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 2), 'yyyy-MM-dd')
  });

  useEffect(() => {
    fetchVehicle();
  }, [vehicleId]);

  const fetchVehicle = async () => {
    try {
      const res = await axios.get(`/api/vehicles/${vehicleId}`);
      setVehicle(res.data);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      toast.error('Failed to load vehicle');
      navigate('/vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    if (!vehicle || !formData.startDate || !formData.endDate) return 0;
    const days = differenceInDays(new Date(formData.endDate), new Date(formData.startDate));
    return days > 0 ? days * vehicle.pricePerDay : vehicle.pricePerDay;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      const res = await axios.post('/api/bookings', {
        vehicleId,
        startDate: formData.startDate,
        endDate: formData.endDate
      });
      toast.success('Booking created successfully!');
      navigate('/bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
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
    return null;
  }

  const total = calculateTotal();
  const days = differenceInDays(new Date(formData.endDate), new Date(formData.startDate));

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-dark-900 font-display mb-8">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-dark-900 mb-6 flex items-center">
                <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Rental Period
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      required
                      min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      id="endDate"
                      name="endDate"
                      type="date"
                      required
                      min={formData.startDate}
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">ℹ️</span>
                  <p className="text-sm text-blue-800">
                    You will not be charged until your booking is confirmed. Free cancellation is available up to 24 hours before pickup.
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h2 className="text-xl font-bold text-dark-900 mb-6 flex items-center">
                    <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                    Payment Method
                  </h2>

                  <div className="space-y-4">
                    <div className="border border-primary-500 bg-primary-50 rounded-xl p-4 flex items-center cursor-pointer">
                      <input type="radio" name="payment" defaultChecked className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300" />
                      <span className="ml-3 font-medium text-dark-900">Pay at Pickup</span>
                      <span className="ml-auto text-xs font-bold text-primary-700 bg-primary-100 px-2 py-1 rounded">RECOMMENDED</span>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 flex items-center opacity-50 cursor-not-allowed">
                      <input type="radio" name="payment" disabled className="h-5 w-5 text-gray-300 border-gray-300" />
                      <span className="ml-3 font-medium text-gray-500">Credit Card (Coming Soon)</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading || !vehicle.availability}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all shadow-lg shadow-primary-600/30 disabled:opacity-50 hover:shadow-primary-600/50 transform hover:-translate-y-0.5"
                >
                  {bookingLoading ? 'Processing...' : `Confirm Booking • $${total}`}
                </button>
              </form>
            </div>
          </div>

          {/* Vehicle Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="relative h-48">
                {vehicle.images && vehicle.images.length > 0 ? (
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-xl">{vehicle.title}</h3>
                  <p className="text-gray-200 text-sm">{vehicle.brand} {vehicle.model}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price per day</span>
                    <span className="font-semibold text-dark-900">${vehicle.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-semibold text-dark-900">{days > 0 ? days : 1} Days</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-dark-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">${total}</span>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-xl text-xs text-gray-500 leading-relaxed">
                  By clicking "Confirm Booking", you agree to our Terms of Service and Rental Policy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

