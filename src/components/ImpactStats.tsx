import React from 'react';
import { Users, Heart, TreePine, TrendingUp, MapPin, Star, Sparkles, ArrowRight } from 'lucide-react';

const ImpactStats: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '15,247',
      label: 'Families Empowered',
      description: 'Rural families earning sustainable income',
      color: 'text-accent-600',
      bgColor: 'from-accent-500 to-accent-600',
      growth: '+23% this year',
    },
    {
      icon: MapPin,
      value: '2,500+',
      label: 'Villages Connected',
      description: 'Across 28 states of India',
      color: 'text-terracotta-600',
      bgColor: 'from-terracotta-500 to-terracotta-600',
      growth: '+15% this year',
    },
    {
      icon: Heart,
      value: '₹45 Cr',
      label: 'Direct Income Generated',
      description: 'Directly to village communities',
      color: 'text-gold-600',
      bgColor: 'from-gold-500 to-gold-600',
      growth: '+40% this year',
    },
    {
      icon: TreePine,
      value: '1,200',
      label: 'Eco-Friendly Stays',
      description: 'Promoting sustainable tourism',
      color: 'text-sage-600',
      bgColor: 'from-sage-500 to-sage-600',
      growth: '+30% this year',
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Goes to Hosts',
      description: 'Minimal platform fees',
      color: 'text-primary-700',
      bgColor: 'from-primary-600 to-primary-700',
      growth: 'Always',
    },
    {
      icon: Star,
      value: '4.8/5',
      label: 'Average Rating',
      description: 'From 50,000+ reviews',
      color: 'text-gold-700',
      bgColor: 'from-gold-600 to-gold-700',
      growth: '+0.2 this year',
    },
  ];

  const handleStartJourney = () => {
    // Create a new page or redirect
    alert('Redirecting to journey planning page with village selection, experience customization, and booking flow...');
  };

  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-primary-100 to-accent-50 relative overflow-hidden">
      {/* Background Art */}
      <div className="absolute inset-0 bg-patachitra opacity-10"></div>
      <div className="absolute inset-0 bg-grain"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 font-serif mb-6">
            Our Impact on Rural India
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-4">
            Together, we're building a sustainable future for rural communities through responsible tourism
          </p>
          <div className="flex items-center justify-center space-x-2 text-accent-600">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Empowering communities • Preserving culture • Sustainable growth</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-primary-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-accent-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`bg-gradient-to-br ${stat.bgColor} bg-opacity-15 p-4 rounded-full w-fit mb-6 group-hover:scale-110 transition-transform duration-300 border border-accent-200`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>

              {/* Value & Growth */}
              <div className="mb-4">
                <div className="flex items-end space-x-2 mb-2">
                  <span className="text-4xl font-bold text-primary-800 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </span>
                  <span className="text-sm text-accent-600 font-medium bg-accent-100 px-2 py-1 rounded-full">
                    {stat.growth}
                  </span>
                </div>
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-primary-800 mb-3 font-serif">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-primary-600 leading-relaxed">
                {stat.description}
              </p>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent-500 to-gold-500 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-10 shadow-xl border-2 border-accent-300 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-warli opacity-15"></div>
            
            <div className="relative">
              <h3 className="text-3xl font-bold text-primary-800 mb-6 font-serif">
                Every Booking Makes a Difference
              </h3>
              <p className="text-lg text-primary-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                When you choose VillageStay, you're not just booking accommodation – you're supporting rural livelihoods, 
                preserving cultural heritage, and contributing to sustainable development that empowers entire communities.
              </p>
              
              {/* Impact Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-accent-100 p-4 rounded-full w-fit mx-auto mb-3">
                    <Heart className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="font-semibold text-primary-800 mb-2">Direct Impact</h4>
                  <p className="text-sm text-primary-600">95% of your payment goes directly to village families</p>
                </div>
                <div className="text-center">
                  <div className="bg-terracotta-100 p-4 rounded-full w-fit mx-auto mb-3">
                    <TreePine className="w-6 h-6 text-terracotta-600" />
                  </div>
                  <h4 className="font-semibold text-primary-800 mb-2">Sustainable Tourism</h4>
                  <p className="text-sm text-primary-600">Eco-friendly practices and cultural preservation</p>
                </div>
                <div className="text-center">
                  <div className="bg-gold-100 p-4 rounded-full w-fit mx-auto mb-3">
                    <Users className="w-6 h-6 text-gold-600" />
                  </div>
                  <h4 className="font-semibold text-primary-800 mb-2">Community Growth</h4>
                  <p className="text-sm text-primary-600">Creating opportunities for entire villages</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleStartJourney}
                  className="bg-gradient-to-r from-accent-500 to-accent-600 text-primary-50 px-10 py-4 rounded-full hover:from-accent-400 hover:to-accent-500 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-accent-500 text-accent-700 px-10 py-4 rounded-full hover:bg-accent-500 hover:text-primary-50 transition-all duration-300 font-medium text-lg">
                  Learn More About Impact
                </button>
              </div>
              
              <p className="text-sm text-primary-500 mt-6">
                🌱 Carbon neutral platform • 🤝 Fair trade tourism • 💚 Community-first approach
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;