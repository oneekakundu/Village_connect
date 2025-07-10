import React, { useState } from 'react';
import { Search, MapPin, Star, Users, Heart, Calendar, ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    guests: '2',
    checkIn: '',
    checkOut: ''
  });

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    console.log('Search data:', searchData);
    
    // Simulate search with example locations
    setTimeout(() => {
      setIsSearching(false);
      // Scroll to villages section
      const element = document.getElementById('villages');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const popularDestinations = [
    'Chandipur, Odisha', 
    'Hatibari, Assam', 
    'Kumbalkonam, Tamil Nadu', 
    'Spiti Valley, HP', 
    'Majuli Island, Assam'
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-gold-300 overflow-hidden min-h-screen flex items-center">
      {/* Traditional Art Backgrounds */}
      <div className="absolute inset-0 bg-patachitra opacity-30"></div>
      <div className="absolute inset-0 bg-rangoli opacity-20"></div>
      <div className="absolute inset-0 bg-madhubani opacity-15"></div>
      <div className="absolute inset-0 bg-grain"></div>
      
      {/* Floating Art Elements */}
      <div className="absolute top-20 left-10 hidden lg:block animate-float">
        <div className="bg-gradient-to-br from-terracotta-500 to-terracotta-600 bg-opacity-20 p-4 rounded-full backdrop-blur-sm border border-terracotta-400">
          <Sparkles className="w-8 h-8 text-terracotta-400" />
        </div>
      </div>
      
      <div className="absolute bottom-32 right-16 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
        <div className="bg-gradient-to-br from-sage-500 to-sage-600 bg-opacity-20 p-4 rounded-full backdrop-blur-sm border border-sage-400">
          <Heart className="w-8 h-8 text-sage-400" />
        </div>
      </div>

      <div className="absolute top-1/3 right-20 hidden xl:block animate-rotate-slow">
        <div className="w-16 h-16 border-2 border-gold-400 border-dashed rounded-full opacity-30"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Main Heading */}
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-tight">
              Discover Authentic
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-gold-400 animate-shimmer bg-[length:200%_100%]">
                Village Experiences
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto text-gold-200 font-light">
              Connect directly with village hosts for genuine cultural immersion.
            </p>
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
              <p className="text-lg text-accent-300 font-medium">
                No middlemen • Direct to hosts • 95% goes to families
              </p>
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center group">
              <div className="text-4xl font-bold text-accent-400 group-hover:scale-110 transition-transform duration-300">2,500+</div>
              <div className="text-sm text-gold-400">Villages Connected</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-accent-400 group-hover:scale-110 transition-transform duration-300">15,000+</div>
              <div className="text-sm text-gold-400">Families Empowered</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-accent-400 group-hover:scale-110 transition-transform duration-300">95%</div>
              <div className="text-sm text-gold-400">Direct to Hosts</div>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-6xl mx-auto mb-8 animate-scale-in" style={{ animationDelay: '0.9s' }}>
            <div className="bg-primary-600 bg-opacity-80 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-accent-500 hover:border-accent-400 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 px-4 py-4 bg-primary-500 bg-opacity-50 rounded-xl border border-accent-600 hover:border-accent-400 transition-all duration-300 group">
                  <MapPin className="w-5 h-5 text-accent-400 group-hover:scale-110 transition-transform duration-300" />
                  <input
                    type="text"
                    name="location"
                    value={searchData.location}
                    onChange={handleInputChange}
                    placeholder="Chandipur, Odisha or Hatibari, Assam"
                    className="w-full text-gold-200 placeholder-gold-400 bg-transparent outline-none"
                  />
                </div>
                <div className="flex items-center space-x-3 px-4 py-4 bg-primary-500 bg-opacity-50 rounded-xl border border-accent-600 hover:border-accent-400 transition-all duration-300 group">
                  <Calendar className="w-5 h-5 text-accent-400 group-hover:scale-110 transition-transform duration-300" />
                  <input
                    type="date"
                    name="checkIn"
                    value={searchData.checkIn}
                    onChange={handleInputChange}
                    className="w-full text-gold-200 bg-transparent outline-none"
                  />
                </div>
                <div className="flex items-center space-x-3 px-4 py-4 bg-primary-500 bg-opacity-50 rounded-xl border border-accent-600 hover:border-accent-400 transition-all duration-300 group">
                  <Calendar className="w-5 h-5 text-accent-400 group-hover:scale-110 transition-transform duration-300" />
                  <input
                    type="date"
                    name="checkOut"
                    value={searchData.checkOut}
                    onChange={handleInputChange}
                    className="w-full text-gold-200 bg-transparent outline-none"
                  />
                </div>
                <div className="flex items-center space-x-3 px-4 py-4 bg-primary-500 bg-opacity-50 rounded-xl border border-accent-600 hover:border-accent-400 transition-all duration-300 group">
                  <Users className="w-5 h-5 text-accent-400 group-hover:scale-110 transition-transform duration-300" />
                  <select
                    name="guests"
                    value={searchData.guests}
                    onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                    className="w-full text-gold-200 bg-transparent outline-none"
                  >
                    <option value="1">1 traveler</option>
                    <option value="2">2 travelers</option>
                    <option value="3">3 travelers</option>
                    <option value="4">4 travelers</option>
                    <option value="5+">5+ travelers</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full mt-4 bg-gradient-to-r from-accent-500 to-accent-600 text-primary-50 px-8 py-4 rounded-xl hover:from-accent-400 hover:to-accent-500 transition-all duration-300 font-medium shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-50"></div>
                    <span>Searching Villages...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Explore Authentic Villages</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <span className="text-gold-400 text-sm font-medium">Popular destinations:</span>
            {popularDestinations.map((dest, index) => (
              <button
                key={dest}
                onClick={() => setSearchData({...searchData, location: dest})}
                className="bg-primary-600 bg-opacity-60 text-gold-300 px-4 py-2 rounded-full text-sm hover:bg-accent-500 hover:text-primary-50 transition-all duration-300 backdrop-blur-sm border border-accent-600 hover:border-accent-400 transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${1.4 + index * 0.1}s` }}
              >
                {dest}
              </button>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gold-400 animate-fade-in" style={{ animationDelay: '1.8s' }}>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-gold-400 fill-current" />
              <span>4.9/5 from 50,000+ reviews</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-accent-400" />
              <span>Trusted by 100,000+ travelers</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-terracotta-400" />
              <span>Verified village hosts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;