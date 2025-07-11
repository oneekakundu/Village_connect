import React, { useState } from 'react';
import { ChefHat, PaintBucket, Music, Tractor, Mountain, Users, ArrowRight, Play, Sparkles, Camera } from 'lucide-react';

const Experiences: React.FC = () => {
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);

  const experiences = [
    {
      id: 1,
      title: 'Traditional Cooking',
      description: 'Learn authentic regional recipes from village grandmothers using clay ovens',
      icon: ChefHat,
      color: 'from-terracotta-500 to-terracotta-600',
      villages: 145,
      image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '2-3 hours',
      price: '₹800',
      highlights: ['Clay oven cooking', 'Secret family recipes', 'Organic ingredients'],
    },
    {
      id: 2,
      title: 'Folk Arts & Crafts',
      description: 'Master pottery, weaving, and traditional handicrafts with local artisans',
      icon: PaintBucket,
      color: 'from-sage-500 to-sage-600',
      villages: 98,
      image: 'https://paintphotographs.com/cdn/images/uploads/345af58b03ea30ca08eb80bc71f951de.jpg',
      duration: '3-4 hours',
      price: '₹1200',
      highlights: ['Pottery wheel training', 'Natural dyes', 'Take home crafts'],
    },
    {
      id: 3,
      title: 'Folk Music & Dance',
      description: 'Experience regional music traditions and dance forms with local performers',
      icon: Music,
      color: 'from-gold-500 to-gold-600',
      villages: 87,
      image: 'https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2018/08/Dandi-Gair-Dance-Marwar-Festival.jpg ',
      duration: '2 hours',
      price: '₹600',
      highlights: ['Live performances', 'Interactive sessions', 'Traditional instruments'],
    },
    {
      id: 4,
      title: 'Farm Life Experience',
      description: 'Participate in organic farming and animal husbandry with farming families',
      icon: Tractor,
      color: 'from-accent-500 to-accent-600',
      villages: 156,
      image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 'Half day',
      price: '₹1500',
      highlights: ['Organic farming', 'Animal care', 'Fresh produce'],
    },
    {
      id: 5,
      title: 'Nature & Trekking',
      description: 'Explore pristine landscapes with experienced local guides',
      icon: Mountain,
      color: 'from-primary-600 to-primary-700',
      villages: 72,
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: 'Full day',
      price: '₹2000',
      highlights: ['Hidden trails', 'Wildlife spotting', 'Photography'],
    },
    {
      id: 6,
      title: 'Cultural Immersion',
      description: 'Live with families and join local festivals and celebrations',
      icon: Users,
      color: 'from-terracotta-600 to-gold-500',
      villages: 201,
      image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '1-3 days',
      price: '₹3000',
      highlights: ['Family stays', 'Festival participation', 'Cultural exchange'],
    },
  ];

  const handleExperienceClick = (experience: any) => {
    console.log('Selected experience:', experience.title);
    alert(`Booking ${experience.title} experience! Connecting you with ${experience.villages} available villages...`);
  };

  return (
    <section id="experiences" className="py-20 bg-gradient-to-br from-primary-200 to-primary-300 relative overflow-hidden">
      {/* Background Art */}
      <div className="absolute inset-0 bg-madhubani opacity-15"></div>
      <div className="absolute inset-0 bg-grain"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 font-serif mb-6">
            Authentic Village Experiences
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-4">
            Immerse yourself in traditional ways of life and learn from local communities
          </p>
          <div className="flex items-center justify-center space-x-2 text-accent-600">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Hands-on learning • Cultural exchange • Authentic traditions</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-accent-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setHoveredExperience(experience.id)}
              onMouseLeave={() => setHoveredExperience(null)}
              onClick={() => handleExperienceClick(experience)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-800/70 to-transparent group-hover:from-primary-800 transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className="relative p-6 h-80 flex flex-col justify-between text-primary-50">
                {/* Icon & Price */}
                <div className="flex items-start justify-between">
                  <div className={`bg-gradient-to-br ${experience.color} p-4 rounded-full w-fit shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <experience.icon className="w-6 h-6 text-primary-50" />
                  </div>
                  <div className="text-right bg-primary-800 bg-opacity-80 rounded-lg p-3">
                    <div className="text-lg font-bold text-accent-400">{experience.price}</div>
                    <div className="text-xs text-primary-200">{experience.duration}</div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold font-serif group-hover:text-accent-300 transition-colors">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-primary-200 leading-relaxed">
                    {experience.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="space-y-1">
                    {experience.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-xs text-accent-300">
                        <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-2"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                  
                  {/* Villages Count & Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-primary-600">
                    <span className="text-sm text-primary-300 flex items-center space-x-1">
                      <Camera className="w-4 h-4" />
                      <span>{experience.villages} villages</span>
                    </span>
                    <div className="flex items-center text-sm text-accent-400 group-hover:text-accent-300 transition-colors">
                      {hoveredExperience === experience.id ? (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          <span className="font-medium">Book Experience</span>
                        </>
                      ) : (
                        <>
                          <span className="mr-1 font-medium">Explore</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 shadow-xl border-2 border-accent-300 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-rangoli opacity-20"></div>
            
            <div className="relative">
              <h3 className="text-3xl font-bold mb-4 font-serif text-primary-800">
                Create Your Custom Experience
              </h3>
              <p className="text-lg mb-6 max-w-3xl mx-auto text-primary-600">
                Tell us what interests you most, and we'll connect you with the perfect village host for a personalized cultural journey
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => alert('Opening custom experience planner with preferences form, village matching, and direct host communication...')}
                  className="bg-gradient-to-r from-accent-500 to-accent-600 text-primary-50 px-8 py-4 rounded-full font-medium hover:from-accent-400 hover:to-accent-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Start Planning</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-accent-500 text-accent-700 px-8 py-4 rounded-full hover:bg-accent-500 hover:text-primary-50 transition-all duration-300 font-medium">
                  View All Experiences
                </button>
              </div>
              <p className="text-sm text-primary-500 mt-4">
                ✨ Personalized matching • Direct host contact • Custom itineraries
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;