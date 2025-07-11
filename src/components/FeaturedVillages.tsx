import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Camera, Phone, MapPin, Star, Leaf, Calendar, Eye } from 'lucide-react';
import SustainabilityBadge from './SustainabilityBadge';

const FeaturedVillages: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedVillage, setSelectedVillage] = useState<number | null>(null);
  // Track current image index for each village
  const [imageIndexes, setImageIndexes] = useState<{ [villageId: number]: number }>({});
  const [showSustainabilityBadge, setShowSustainabilityBadge] = useState(false);
  const [badgeVillageName, setBadgeVillageName] = useState('');
  const [badgeAmount, setBadgeAmount] = useState(0);
  const [showMoreVillages, setShowMoreVillages] = useState(false);

  const toggleFavorite = (villageId: number) => {
    setFavorites(prev => 
      prev.includes(villageId) 
        ? prev.filter(id => id !== villageId)
        : [...prev, villageId]
    );
  };

  const handlePrevImage = (villageId: number, imagesLength: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [villageId]: prev[villageId] === undefined
        ? imagesLength - 1
        : (prev[villageId] - 1 + imagesLength) % imagesLength,
    }));
  };

  const handleNextImage = (villageId: number, imagesLength: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [villageId]: prev[villageId] === undefined
        ? 1 % imagesLength
        : (prev[villageId] + 1) % imagesLength,
    }));
  };

  const handleBookNow = (village: any) => {
    console.log('Booking village:', village.name);
    // Simulate payment and show sustainability badge
    setBadgeVillageName(village.name);
    setBadgeAmount(village.pricePerNight);
    setShowSustainabilityBadge(true);
  };

  const handleViewAllVillages = () => {
    // Implement view all functionality
    alert('Redirecting to all villages page with advanced filters and map view...');
  };

  const villages = [
    {
      id: 1,
      name: 'Chandipur Beach Village',
      location: 'Chandipur, Odisha, India',
      rating: 4.9,
      reviews: 127,
      images: [
        'https://www.nativeplanet.com/img/2016/08/1chandipur-29-1472453774.jpg',
        'https://odishatourism.gov.in/content/dam/tourism/home/discover/attractions/beaches/chandipur/chandipur%20corosal1.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0a/08/31/14/chandipur-beach.jpg',
      ],
      pricePerNight: 1200,
      hostName: 'Meera Devi',
      hostImage: 'https://img.freepik.com/premium-photo/indian-woman-portrait-temple_53876-71699.jpg',
      experiences: ['Traditional Cooking', 'Pottery Making', 'Folk Music', 'Beach Walks'],
      ecoFeatures: ['Solar Power', 'Organic Farm', 'Plastic-Free'],
      offlineBooking: true,
      instantBook: true,
      description: 'Experience the magical disappearing sea at Chandipur beach while staying with local fishing families.',
      specialFeature: 'Tidal Sea Phenomenon',
    },
    {
      id: 2,
      name: 'Hatibari Tea Estate',
      location: 'Jhargram, WestBengal, India',
      rating: 4.8,
      reviews: 89,
      images: [
        'https://tourly.in/wp-content/uploads/classified-listing/2024/08/hatibari-1.jpg',        
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcz0YX3PH0v_kd2_KUmDos60XXxK-SAhwyYg&s',
        'https://www.team-bhp.com/forum/attachments/travelogues/2124222d1688003339t-west-bengal-treasure-tourists-img_20210221_180706.jpg'
      ],
      pricePerNight: 1500,
      hostName: 'Biju Gogoi',
      hostImage: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=150',
      experiences: ['Subornarekha river view', 'Jungel Safari', 'Local traditional food', 'River Fishing'],
      ecoFeatures: ['Bamboo Construction', 'Rainwater Harvesting'],
      offlineBooking: true,
      instantBook: false,
      description: 'Live on the banks of Subornorekha and enjoy the serene beauty. ',
      specialFeature: 'Subornorekha River Fishing',
    },
    {
      id: 3,
      name: 'Kumbalkonam Heritage Village',
      location: 'Kumbalkonam, Tamil Nadu, India',
      rating: 4.7,
      reviews: 156,
      images: [
        'https://cultureandheritage.org/wp-content/uploads/2023/05/xyz-12.jpg',
        'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800'
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
    {
      id: 4,
      name: 'Rajasthan Desert Village',
      location: 'Jaisalmer, Rajasthan, India',
      rating: 4.6,
      reviews: 142,
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      ],
      pricePerNight: 1500,
      hostName: 'Dev Singh',
      hostImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      experiences: ['Camel Safari', 'Desert Camping', 'Folk Music', 'Traditional Crafts'],
      ecoFeatures: ['Solar Power', 'Water Conservation', 'Local Materials'],
      offlineBooking: true,
      instantBook: true,
      description: 'Experience the magic of the Thar Desert. Stay in traditional mud houses and enjoy camel safaris under the stars.',
      specialFeature: 'Desert Experience',
    },
    {
      id: 5,
      name: 'Goa Spice Plantation',
      location: 'Ponda, Goa, India',
      rating: 4.8,
      reviews: 178,
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      ],
      pricePerNight: 2000,
      hostName: 'Maria Fernandes',
      hostImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      experiences: ['Spice Tour', 'Cooking Classes', 'Beach Visits', 'Local Markets'],
      ecoFeatures: ['Organic Spices', 'Solar Energy', 'Waste Composting'],
      offlineBooking: false,
      instantBook: true,
      description: 'Stay in a traditional Goan house surrounded by spice plantations. Learn about spice cultivation and enjoy local cuisine.',
      specialFeature: 'Spice Heritage',
    },
    {
      id: 6,
      name: 'Assam Tea Garden',
      location: 'Dibrugarh, Assam, India',
      rating: 4.7,
      reviews: 165,
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      ],
      pricePerNight: 1600,
      hostName: 'Bikram Gogoi',
      hostImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      experiences: ['Tea Picking', 'Tea Processing', 'Garden Walks', 'Local Cuisine'],
      ecoFeatures: ['Organic Tea', 'Rainwater Harvesting', 'Biodiversity'],
      offlineBooking: true,
      instantBook: false,
      description: 'Experience tea plantation life in the lush green hills of Assam. Learn tea processing and enjoy scenic views.',
      specialFeature: 'Tea Heritage',
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {villages.slice(0, 3).map((village, index) => (
            <div
              key={village.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group border border-slate-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image Carousel */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={village.images[imageIndexes[village.id] ?? 0]}
                  alt={village.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Left Arrow */}
                {village.images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage(village.id, village.images.length);
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md z-10"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="w-5 h-5 text-slate-700" />
                  </button>
                )}
                {/* Right Arrow */}
                {village.images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage(village.id, village.images.length);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md z-10"
                    aria-label="Next image"
                  >
                    <ArrowRight className="w-5 h-5 text-slate-700" />
                  </button>
                )}
                
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

        {/* More Villages Dropdown */}
        <div className="mb-16">
          <button
            onClick={() => setShowMoreVillages(!showMoreVillages)}
            className="w-full bg-gradient-to-r from-accent-500 to-emerald-500 text-white px-8 py-4 rounded-xl hover:from-accent-400 hover:to-emerald-400 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>{showMoreVillages ? 'Show Less Villages' : 'Show More Villages'}</span>
            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${showMoreVillages ? 'rotate-90' : ''}`} />
          </button>
          
          {showMoreVillages && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-down">
              {villages.slice(3).map((village, index) => (
                <div
                  key={village.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group border border-slate-200 animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Image Carousel */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={village.images[imageIndexes[village.id] ?? 0]}
                      alt={village.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Left Arrow */}
                    {village.images.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage(village.id, village.images.length);
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md z-10"
                        aria-label="Previous image"
                      >
                        <ArrowLeft className="w-5 h-5 text-slate-700" />
                      </button>
                    )}
                    {/* Right Arrow */}
                    {village.images.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage(village.id, village.images.length);
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md z-10"
                        aria-label="Next image"
                      >
                        <ArrowRight className="w-5 h-5 text-slate-700" />
                      </button>
                    )}
                    
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
          )}
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
      
      {/* Sustainability Badge */}
      <SustainabilityBadge
        isVisible={showSustainabilityBadge}
        onClose={() => setShowSustainabilityBadge(false)}
        villageName={badgeVillageName}
        amount={badgeAmount}
      />
    </section>
  );
};

export default FeaturedVillages;