import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from './context/AuthContext';

// User Pages
import Home from './pages/user/Home';
import VehicleListings from './pages/user/VehicleListings';
import VehicleDetails from './pages/user/VehicleDetails';
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import Profile from './pages/user/Profile';
import MyBookings from './pages/user/MyBookings';
import Checkout from './pages/user/Checkout';
import About from './pages/user/About';
import Contact from './pages/user/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageVehicles from './pages/admin/ManageVehicles';
import ManageBookings from './pages/admin/ManageBookings';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCategories from './pages/admin/ManageCategories';

// Components
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/vehicles" element={<VehicleListings />} />
              <Route path="/vehicles/:id" element={<VehicleDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
              <Route path="/checkout/:vehicleId" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/vehicles" element={<AdminRoute><ManageVehicles /></AdminRoute>} />
              <Route path="/admin/bookings" element={<AdminRoute><ManageBookings /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
              <Route path="/admin/categories" element={<AdminRoute><ManageCategories /></AdminRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

