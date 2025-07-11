import React, { useState } from 'react';
import { MapPin, Star, Users, Leaf, MessageSquare, Calendar, Heart, Eye, ArrowRight, Camera, Phone } from 'lucide-react';

const FeaturedVillages: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedVillage, setSelectedVillage] = useState<number | null>(null);

  const villages = [
    {
      id: 1,
      name: 'Chandipur Beach Village',
      location: 'Chandipur, Odisha, India',
      rating: 4.9,
      reviews: 127,
      images: [
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      pricePerNight: 1200,
      hostName: 'Meera Devi',
      hostImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      experiences: ['Traditional Cooking', 'Pottery Making', 'Folk Music', 'Beach Walks'],
      ecoFeatures: ['Solar Power', 'Organic Farm', 'Plastic-Free'],
      offlineBooking: true,
      instantBook: true,
      description: 'Experience the magical disappearing sea at Chandipur beach while staying with local fishing families.',
      specialFeature: 'Vanishing Sea Phenomenon',
    },
    {
      id: 2,
      name: 'Hatibari Tea Estate',
      location: 'Hatibari, Assam, India',
      rating: 4.8,
      reviews: 89,
      images: [
        'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      pricePerNight: 1500,
      hostName: 'Biju Gogoi',
      hostImage: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=150',
      experiences: ['Tea Plucking', 'Elephant Safari', 'Silk Weaving', 'River Fishing'],
      ecoFeatures: ['Bamboo Construction', 'Rainwater Harvesting'],
      offlineBooking: true,
      instantBook: false,
      description: 'Live among tea gardens and learn traditional Assamese culture with elephant conservation.',
      specialFeature: 'Elephant Conservation',
    },
    {
      id: 3,
      name: 'Kumbalkonam Heritage Village',
      location: 'Kumbalkonam, Tamil Nadu, India',
      rating: 4.7,
      reviews: 156,
      images: [
        'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      pricePerNight: 1800,
      hostName: 'Lakshmi Amma',
      hostImage: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      experiences: ['Temple Architecture', 'Classical Dance', 'Bronze Casting', 'Silk Weaving'],
      ecoFeatures: ['Wind Power', 'Composting', 'Traditional Architecture'],
      offlineBooking: false,
      instantBook: true,
      description: 'Discover ancient temple architecture and traditional Tamil arts in this cultural heritage village.',
      specialFeature: 'Temple Architecture Tours',
    },
  ];

  const toggleFavorite = (villageId: number) => {
    setFavorites(prev => 
      prev.includes(villageId) 
        ? prev.filter(id => id !== villageId)
        : [...prev, villageId]
    );
  };

  const handleBookNow = (village: any) => {
    console.log('Booking village:', village.name);
    // Implement booking functionality
    alert(`Booking ${village.name}! Redirecting to booking page...`);
  };

  const handleViewAllVillages = () => {
    // Implement view all functionality
    alert('Redirecting to all villages page with advanced filters and map view...');
  };

  return (
    <section id="villages" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Background Art */}
      <div className="absolute inset-0 bg-warli opacity-10"></div>
      <div className="absolute inset-0 bg-grain"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 font-serif mb-6">
            Featured Village Stays
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
            Handpicked authentic experiences from our most beloved village hosts across India
          </p>
          <div className="flex items-center justify-center space-x-2 text-emerald-600">
            <Heart className="w-5 h-5" />
            <span className="font-medium">Direct bookings • No middlemen • 95% goes to hosts</span>
            <Heart className="w-5 h-5" />
          </div>
        </div>

        {/* Villages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {villages.map((village, index) => (
            <div
              key={village.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group border border-slate-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image Carousel */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={village.images[0]}
                  alt={village.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Image Counter */}
                <div className="absolute top-4 left-4 bg-slate-800 bg-opacity-80 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <Camera className="w-4 h-4" />
                  <span>{village.images.length} photos</span>
                </div>
                
                {/* Instant Book Badge */}
                {village.instantBook && (
                  <div className="absolute top-4 right-16 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    Instant Book
                  </div>
                )}
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(village.id);
                  }}
                  className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all transform hover:scale-110"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      favorites.includes(village.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-slate-600'
                    }`} 
                  />
                </button>
                
                {/* Offline Booking Icon */}
                {village.offlineBooking && (
                  <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-2 rounded-full" title="SMS/Call booking available">
                    <Phone className="w-4 h-4 text-accent-600" />
                  </div>
                )}

                {/* Special Feature Badge */}
                <div className="absolute bottom-4 left-4 bg-coral-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {village.specialFeature}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Location & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-slate-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{village.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-gold-500 fill-current mr-1" />
                    <span className="text-sm font-medium text-slate-700">{village.rating}</span>
                    <span className="text-slate-500 text-sm ml-1">({village.reviews})</span>
                  </div>
                </div>

                {/* Village Name */}
                <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif group-hover:text-accent-700 transition-colors">
                  {village.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {village.description}
                </p>

                {/* Host Info */}
                <div className="flex items-center mb-4">
                  <img
                    src={village.hostImage}
                    alt={village.hostName}
                    className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-accent-300"
                  />
                  <div>
                    <p className="text-sm text-slate-500">Hosted by</p>
                    <p className="text-sm font-medium text-accent-700">{village.hostName}</p>
                  </div>
                </div>

                {/* Experiences */}
                <div className="mb-4">
                  <p className="text-sm text-slate-500 mb-2">Popular experiences:</p>
                  <div className="flex flex-wrap gap-2">
                    {village.experiences.slice(0, 2).map((exp, index) => (
                      <span
                        key={index}
                        className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                    {village.experiences.length > 2 && (
                      <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs">
                        +{village.experiences.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Eco Features */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    {village.ecoFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                        <Leaf className="w-3 h-3 mr-1" />
                        <span className="text-xs font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Book Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-slate-800">₹{village.pricePerNight}</span>
                    <span className="text-slate-500 text-sm"> / night</span>
                  </div>
                  <button 
                    onClick={() => handleBookNow(village)}
                    className="bg-gradient-to-r from-accent-500 to-emerald-500 text-white px-6 py-3 rounded-full hover:from-accent-400 hover:to-emerald-400 transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <button 
            onClick={handleViewAllVillages}
            className="bg-gradient-to-r from-slate-700 to-slate-800 border-2 border-accent-500 text-accent-400 px-12 py-4 rounded-full hover:bg-gradient-to-r hover:from-accent-500 hover:to-emerald-500 hover:text-white transition-all duration-300 font-medium text-lg flex items-center space-x-3 mx-auto shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <Eye className="w-5 h-5" />
            <span>View All Villages</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-slate-600 mt-3">
            Explore 2,500+ villages with advanced filters, map view, and virtual tours
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVillages;