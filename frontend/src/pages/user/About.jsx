import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            {/* Hero Section */}
            <div className="relative bg-dark-900 text-white py-20 mb-16 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-dark-900 to-dark-900/50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 animate-fade-in-up">
                        Redefining <span className="text-primary-500">Luxury Travel</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        At AutoFleet Rentals, we believe the journey is just as important as the destination.
                        We provide an exceptional fleet of premium vehicles for those who demand the best.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Our Story */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-full z-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt="Our Fleet"
                            className="relative z-10 rounded-2xl shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block">
                            <p className="text-4xl font-bold text-primary-600 font-display">10+</p>
                            <p className="text-gray-600 font-medium">Years of Excellence</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-dark-900 mb-6 font-display">Our Story</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Founded in 2015, AutoFleet Rentals started with a simple mission: to make luxury accessible.
                            What began as a small collection of sports cars has grown into a premier rental service
                            featuring the world's most prestigious automotive brands.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            We understand that every client is unique. Whether you need a sophisticated sedan for a business trip,
                            a spacious SUV for a family vacation, or a high-performance coupe for a weekend getaway,
                            we have the perfect vehicle to match your style and needs.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <span className="text-2xl mb-2 block">🏆</span>
                                <h3 className="font-bold text-dark-900">Award Winning</h3>
                                <p className="text-sm text-gray-500">Recognized for service excellence</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <span className="text-2xl mb-2 block">🌍</span>
                                <h3 className="font-bold text-dark-900">Global Reach</h3>
                                <p className="text-sm text-gray-500">Serving clients worldwide</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-dark-900 mb-4 font-display">Our Core Values</h2>
                        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Excellence', desc: 'We maintain our fleet to the highest standards of performance and cleanliness.', icon: '✨' },
                            { title: 'Integrity', desc: 'Transparent pricing with no hidden fees. What you see is what you pay.', icon: '🤝' },
                            { title: 'Passion', desc: 'We are car enthusiasts serving car enthusiasts. We love what we do.', icon: '❤️' }
                        ].map((value, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
                                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 bg-primary-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-primary-600">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-dark-900 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Ready to Experience the Best?</h2>
                        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers and elevate your travel experience today.
                        </p>
                        <Link
                            to="/vehicles"
                            className="inline-block bg-white text-primary-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105"
                        >
                            Browse Our Fleet
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
