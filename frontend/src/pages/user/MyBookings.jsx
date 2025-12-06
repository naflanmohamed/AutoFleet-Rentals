import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings');
      setBookings(res.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-dark-900 font-display">My Bookings</h1>
          <Link to="/vehicles" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
            <span className="mr-2">+</span> Book New Vehicle
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <span className="text-6xl mb-4 block">📅</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start your journey today!</p>
            <Link
              to="/vehicles"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
            >
              Browse Vehicles
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row">
                  {/* Vehicle Image */}
                  <div className="md:w-1/3 lg:w-1/4 relative">
                    {booking.vehicleId && booking.vehicleId.images && booking.vehicleId.images.length > 0 ? (
                      <img
                        src={booking.vehicleId.images[0]}
                        alt={booking.vehicleId.title}
                        className="w-full h-full object-cover min-h-[200px]"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center min-h-[200px]">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="p-6 md:w-2/3 lg:w-3/4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-dark-900 mb-1">
                            {booking.vehicleId ? booking.vehicleId.title : 'Vehicle Unavailable'}
                          </h3>
                          <p className="text-gray-500">
                            {booking.vehicleId ? `${booking.vehicleId.brand} ${booking.vehicleId.model}` : 'N/A'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Total Price</p>
                          <p className="text-2xl font-bold text-primary-600">${booking.totalPrice}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded-xl">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pick-up</p>
                          <p className="font-semibold text-dark-900">{format(new Date(booking.startDate), 'MMM dd, yyyy')}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Drop-off</p>
                          <p className="font-semibold text-dark-900">{format(new Date(booking.endDate), 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Cancel Booking
                        </button>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
                        >
                          View Ticket
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ticket Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="bg-primary-600 p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold font-display">Booking Ticket</h2>
                <p className="text-primary-100 text-sm">Ref: {selectedBooking._id}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/3">
                  {selectedBooking.vehicleId?.images?.[0] && (
                    <img
                      src={selectedBooking.vehicleId.images[0]}
                      alt={selectedBooking.vehicleId.title}
                      className="w-full h-32 object-cover rounded-xl shadow-md"
                    />
                  )}
                  <div className="mt-4 text-center">
                    <h3 className="font-bold text-lg text-dark-900">{selectedBooking.vehicleId?.title}</h3>
                    <p className="text-gray-500">{selectedBooking.vehicleId?.brand} {selectedBooking.vehicleId?.model}</p>
                  </div>
                </div>

                <div className="md:w-2/3 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pick-up Date</p>
                      <p className="font-bold text-dark-900">{format(new Date(selectedBooking.startDate), 'PPP')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Drop-off Date</p>
                      <p className="font-bold text-dark-900">{format(new Date(selectedBooking.endDate), 'PPP')}</p>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Amount Paid</span>
                      <span className="text-2xl font-bold text-primary-600">${selectedBooking.totalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-green-100 text-green-800">
                        {selectedBooking.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-6 border-t border-gray-100">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-6 py-2 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-dark-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2"
                >
                  <span>🖨️</span> Print Ticket
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 text-center text-xs text-gray-400">
              <p>Thank you for choosing AutoFleet Rentals. Have a safe journey!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;

