import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-900 text-white mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 group w-fit">
              <span className="text-3xl">🚗</span>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-display text-gradient">AutoFleet</span>
                <span className="text-xs text-gray-500 font-medium tracking-widest uppercase -mt-1">Rentals</span>
              </div>
            </Link>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Experience the freedom of the open road with our premium fleet.
              We provide top-quality vehicles for every journey, ensuring comfort,
              style, and reliability at every turn.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold font-display mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/vehicles" className="hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Browse Vehicles
                </Link>
              </li>
              <li>
                <Link to="/About" className="hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/Contact" className="hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold font-display mb-6 text-white">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <span className="text-primary-400 mt-1">📍</span>
                <span>123 Premium Drive,<br />Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary-400">📧</span>
                <a href="mailto:info@autofleet.com" className="hover:text-white transition-colors">info@autofleet.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary-400">📞</span>
                <a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AutoFleet Rentals. All rights reserved. <br />
            Developed by <a href="https://www.linkedin.com/in/naflan-mohamed" className="text-primary-400 hover:text-white transition-colors">Naflan Mohamed</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

