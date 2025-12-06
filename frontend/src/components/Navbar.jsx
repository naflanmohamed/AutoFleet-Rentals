import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-2' : 'bg-transparent py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🚗</span>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-display text-gradient">AutoFleet</span>
                <span className="text-xs text-gray-500 font-medium tracking-widest uppercase -mt-1">Rentals</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/vehicles"
              className={`text-sm font-medium transition-colors duration-300 ${isActive('/vehicles') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
                }`}
            >
              Vehicles
            </Link>

            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link
                    to="/admin/dashboard"
                    className={`text-sm font-medium transition-colors duration-300 ${isActive('/admin/dashboard') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
                      }`}
                  >
                    Admin Panel
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/bookings"
                      className={`text-sm font-medium transition-colors duration-300 ${isActive('/bookings') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
                        }`}
                    >
                      My Bookings
                    </Link>
                    <Link
                      to="/profile"
                      className={`text-sm font-medium transition-colors duration-300 ${isActive('/profile') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
                        }`}
                    >
                      Profile
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-white text-primary-600 border-2 border-primary-600 px-6 py-2 rounded-full text-sm font-bold hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary-500/30"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 font-medium text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

