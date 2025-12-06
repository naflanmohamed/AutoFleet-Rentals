import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedVehicles = () => {
    const [featuredVehicles, setFeaturedVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await axios.get('/api/vehicles?featured=true&limit=3');
                setFeaturedVehicles(res.data || []);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    return (
        <div className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-dark-900 mb-2 font-display">Featured Vehicles</h2>
                        <p className="text-gray-600">Hand-picked selections just for you</p>
                    </div>
                    <Link to="/vehicles" className="text-primary-600 font-bold hover:text-primary-700 flex items-center group">
                        View All
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredVehicles.length > 0 ? (
                            featuredVehicles.map((vehicle) => (
                                <div key={vehicle._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={vehicle.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                                            alt={vehicle.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary-600 shadow-sm">
                                            ${vehicle.pricePerDay}/day
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="text-sm text-primary-500 font-bold uppercase tracking-wider mb-1">{vehicle.category?.name || 'Luxury'}</p>
                                                <h3 className="text-xl font-bold text-dark-900">{vehicle.title}</h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-500 text-sm mb-6 space-x-4">
                                            <span>{vehicle.brand}</span>
                                            <span>•</span>
                                            <span>{vehicle.year}</span>
                                            <span>•</span>
                                            <span>{vehicle.model}</span>
                                        </div>
                                        <Link
                                            to={`/vehicles/${vehicle._id}`}
                                            className="block w-full text-center bg-gray-50 hover:bg-primary-600 text-dark-900 hover:text-white font-bold py-3 rounded-xl transition-colors duration-300"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-500 text-lg">No featured vehicles available at the moment.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturedVehicles;
