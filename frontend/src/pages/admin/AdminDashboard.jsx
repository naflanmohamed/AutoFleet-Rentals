import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalCategories: 0,
    pendingBookings: 0,
    confirmedBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [vehiclesRes, bookingsRes, usersRes, categoriesRes] = await Promise.all([
        axios.get('/api/vehicles'),
        axios.get('/api/bookings'),
        axios.get('/api/users'),
        axios.get('/api/categories')
      ]);

      const bookings = bookingsRes.data;
      const pendingBookings = bookings.filter(b => b.status === 'pending').length;
      const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

      setStats({
        totalVehicles: vehiclesRes.data.length,
        totalBookings: bookings.length,
        totalUsers: usersRes.data.length,
        totalCategories: categoriesRes.data.length,
        pendingBookings,
        confirmedBookings
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold text-dark-900 font-display mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-primary-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Vehicles</p>
                <h3 className="text-3xl font-bold text-dark-900">{stats.totalVehicles}</h3>
              </div>
              <span className="bg-primary-100 text-primary-600 p-3 rounded-xl text-2xl">🚗</span>
            </div>
            <Link to="/admin/vehicles" className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-4 inline-flex items-center group">
              Manage Vehicles <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Bookings</p>
                <h3 className="text-3xl font-bold text-dark-900">{stats.totalBookings}</h3>
              </div>
              <span className="bg-blue-100 text-blue-600 p-3 rounded-xl text-2xl">📅</span>
            </div>
            <Link to="/admin/bookings" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-flex items-center group">
              Manage Bookings <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Users</p>
                <h3 className="text-3xl font-bold text-dark-900">{stats.totalUsers}</h3>
              </div>
              <span className="bg-purple-100 text-purple-600 p-3 rounded-xl text-2xl">👥</span>
            </div>
            <Link to="/admin/users" className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-4 inline-flex items-center group">
              Manage Users <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Categories</p>
                <h3 className="text-3xl font-bold text-dark-900">{stats.totalCategories}</h3>
              </div>
              <span className="bg-orange-100 text-orange-600 p-3 rounded-xl text-2xl">🏷️</span>
            </div>
            <Link to="/admin/categories" className="text-orange-600 hover:text-orange-700 text-sm font-medium mt-4 inline-flex items-center group">
              Manage Categories <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Pending Bookings</p>
                <h3 className="text-3xl font-bold text-dark-900">{stats.pendingBookings}</h3>
              </div>
              <span className="bg-yellow-100 text-yellow-600 p-3 rounded-xl text-2xl">⏳</span>
            </div>
            <div className="mt-4 text-sm text-gray-400">Requires action</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Confirmed Bookings</p>
                <h3 className="text-3xl font-bold text-dark-900">{stats.confirmedBookings}</h3>
              </div>
              <span className="bg-green-100 text-green-600 p-3 rounded-xl text-2xl">✅</span>
            </div>
            <div className="mt-4 text-sm text-gray-400">Active reservations</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-dark-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/vehicles"
              className="bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-200 p-4 rounded-xl text-center transition-all duration-300 group"
            >
              <span className="block text-2xl mb-2 group-hover:scale-110 transition-transform">➕</span>
              <span className="font-bold text-gray-700 group-hover:text-primary-700">Add Vehicle</span>
            </Link>
            <Link
              to="/admin/categories"
              className="bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 p-4 rounded-xl text-center transition-all duration-300 group"
            >
              <span className="block text-2xl mb-2 group-hover:scale-110 transition-transform">📑</span>
              <span className="font-bold text-gray-700 group-hover:text-orange-700">Add Category</span>
            </Link>
            <Link
              to="/admin/bookings"
              className="bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 p-4 rounded-xl text-center transition-all duration-300 group"
            >
              <span className="block text-2xl mb-2 group-hover:scale-110 transition-transform">📋</span>
              <span className="font-bold text-gray-700 group-hover:text-blue-700">View Bookings</span>
            </Link>
            <Link
              to="/admin/users"
              className="bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-200 p-4 rounded-xl text-center transition-all duration-300 group"
            >
              <span className="block text-2xl mb-2 group-hover:scale-110 transition-transform">👥</span>
              <span className="font-bold text-gray-700 group-hover:text-purple-700">View Users</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

