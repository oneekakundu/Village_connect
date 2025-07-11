import React, { useState } from 'react';
import { Menu, X, Globe, MapPin, Phone, User, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
    { code: 'ne', name: 'Nepali', native: 'नेपाली' },
    { code: 'si', name: 'Sinhala', native: 'සිංහල' },
  ];

  const menuItems = [
    { name: 'Explore Villages', href: '#villages', id: 'villages' },
    { name: 'Experiences', href: '#experiences', id: 'experiences' },
    { name: 'Impact Stories', href: '#impact', id: 'impact' },
    { name: 'About Us', href: '#about', id: 'about' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-primary-900 shadow-xl sticky top-0 z-50 border-b-2 border-accent-500 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-10 justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-accent-500 to-emerald-500 p-2 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-serif group-hover:text-gold-400 transition-colors duration-300">
              VillageStay
            </span>
            <div className="hidden sm:block text-xs text-emerald-400 bg-emerald-500 bg-opacity-20 px-2 py-1 rounded-full border border-emerald-400">
              No Middlemen
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-200 hover:text-accent-400 transition-all duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-slate-200 hover:text-accent-400 transition-all duration-300 bg-primary-800 px-3 py-2 rounded-lg hover:bg-primary-700 border border-slate-600"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === currentLanguage)?.native}
                </span>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-primary-800 rounded-xl shadow-2xl border border-accent-500 z-20 max-h-64 overflow-y-auto animate-scale-in">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 text-sm hover:bg-accent-500 hover:text-white transition-all duration-200 ${
                        currentLanguage === lang.code ? 'bg-accent-500 text-white' : 'text-slate-200'
                      } first:rounded-t-xl last:rounded-b-xl`}
                    >
                      <div className="font-medium">{lang.native}</div>
                      <div className="text-xs opacity-75">{lang.name}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Emergency Contact */}
            <div className="hidden h-10 w-60 sm:flex items-center space-x-2 text-gold-400 bg-primary-800 px-3 py-2 rounded-lg border border-slate-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+91-1800-VILLAGE</span>
            </div>

            {/* User Profile or Login */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 bg-gradient-to-r from-accent-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {user.profile.firstName} ({user.role})
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-200 hover:text-accent-400 transition-colors hover:bg-primary-800 rounded-lg"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-accent-500 to-emerald-500 text-white px-0 py-0 rounded-full hover:from-accent-400 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <div className="flex items-center space-x-3 bg-gradient-to-r from-accent-500 to-emerald-500 text-white px-10 py-1 rounded-full shadow-lg hover:shadow-xl transition-all duration-300  border-accent-400">
                  <User className="w-4 h-10" />
                  <span className="hidden h-10 w-10 sm:inline font-medium">Join Us</span>
                </div>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 bg-gradient-to-r from-accent-500 to-emerald-500 text-white px-6 py-0 rounded-full hover:from-accent-400 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-accent-400 font-medium"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="font-semibold">Join VillageStay</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <div className="space-y-2 bg-primary-800 rounded-xl p-4 mt-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-slate-200 hover:text-accent-400 hover:bg-primary-700 rounded-lg transition-all duration-200"
                >
                  {item.name}
                </button>
              ))}
              <div className="border-t border-accent-500 pt-3 mt-3">
                <div className="flex items-center space-x-2 px-4 py-2 text-gold-400">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+91-1800-VILLAGE</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header;