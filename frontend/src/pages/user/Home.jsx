import { Link } from 'react-router-dom';
import FeaturedVehicles from '../../components/FeaturedVehicles';

import heroImage from '../../assets/images/car-hero.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 z-10"></div>
          <img
            src={heroImage}
            alt="Luxury Car"
            className="w-full h-full object-cover transform scale-105 animate-slow-zoom"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium tracking-wider uppercase animate-fade-in-down">
            Premium Car Rental Service
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-display tracking-tight leading-tight animate-fade-in-up">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-200 to-secondary-400">Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up delay-100">
            Discover an exclusive fleet of luxury and performance vehicles designed to turn every drive into an unforgettable experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-200">
            <Link
              to="/vehicles"
              className="group relative px-8 py-4 bg-primary-600 rounded-full text-white font-bold text-lg overflow-hidden shadow-lg shadow-primary-600/30 transition-all hover:scale-105 hover:shadow-primary-600/50"
            >
              <span className="relative z-10">Browse Fleet</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-full text-white font-bold text-lg hover:bg-white/10 transition-all hover:scale-105"
            >
              Become a Member
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => document.getElementById('brands').scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>

      {/* Brands Strip */}
      <div id="brands" className="bg-dark-900 py-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium tracking-widest uppercase mb-8">Trusted by elite drivers worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Tesla', 'Range Rover'].map((brand) => (
              <span key={brand} className="text-2xl md:text-3xl font-display font-bold text-white hover:text-primary-400 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-900 mb-6 font-display">Why Choose AutoFleet?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We don't just rent cars; we provide a seamless premium experience from start to finish.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: '🚀',
                title: 'Premium Selection',
                desc: 'Access to the latest models from top luxury manufacturers, maintained to perfection.'
              },
              {
                icon: '💎',
                title: 'Transparent Pricing',
                desc: 'Competitive daily rates with zero hidden fees. What you see is exactly what you pay.'
              },
              {
                icon: '🛡️',
                title: 'Comprehensive Coverage',
                desc: 'Drive with total peace of mind knowing you are fully protected by our premium insurance.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
                <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-dark-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Vehicles Component */}
      <div className="bg-gray-50">
        <FeaturedVehicles />
      </div>

      {/* How It Works */}
      <div className="py-32 bg-dark-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-display">Seamless Rental <br /><span className="text-primary-500">Experience</span></h2>
              <div className="space-y-12">
                {[
                  { step: '01', title: 'Choose Your Vehicle', desc: 'Browse our extensive fleet and find the perfect car for your journey.' },
                  { step: '02', title: 'Book Online', desc: 'Secure your reservation instantly with our easy-to-use booking system.' },
                  { step: '03', title: 'Pick Up & Drive', desc: 'Collect your vehicle from our premium locations or request delivery.' }
                ].map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="text-5xl font-bold text-white/10 font-display">{item.step}</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl transform rotate-6 opacity-20 blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Experience"
                className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-900 mb-6 font-display">Client Stories</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The service was absolutely impeccable. The car was in pristine condition and the delivery was right on time.",
                author: "James Wilson",
                role: "Business Executive",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "AutoFleet made our anniversary trip special. Driving the convertible along the coast was a dream come true.",
                author: "Sarah Jenkins",
                role: "Travel Enthusiast",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "I've rented from many luxury services, but AutoFleet stands out for their attention to detail and fleet quality.",
                author: "Michael Chang",
                role: "Car Collector",
                image: "https://randomuser.me/api/portraits/men/86.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl relative">
                <div className="text-primary-500 text-6xl font-serif absolute top-4 left-6 opacity-20">"</div>
                <p className="text-gray-600 italic mb-8 relative z-10 pt-6">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-dark-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
              <div className="absolute w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-20 -left-20 animate-blob"></div>
              <div className="absolute w-96 h-96 bg-secondary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 bottom-20 right-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-display">Ready to Drive?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join our exclusive community of drivers and experience the road like never before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/vehicles"
                  className="bg-primary-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-600/40 hover:-translate-y-1"
                >
                  Book Your Car
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all hover:-translate-y-1"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
