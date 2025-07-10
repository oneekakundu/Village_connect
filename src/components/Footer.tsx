import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Heart, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    'Explore': [
      'Featured Villages',
      'Experiences',
      'Regional Cuisine',
      'Cultural Activities',
      'Eco-Tourism',
    ],
    'Support': [
      'Help Center',
      'Safety Guidelines',
      'Booking Policies',
      'Payment Options',
      'Contact Us',
    ],
    'Community': [
      'Become a Host',
      'Host Resources',
      'Impact Stories',
      'Village Projects',
      'Sustainability',
    ],
    'Company': [
      'About Us',
      'Our Mission',
      'Press & Media',
      'Careers',
      'Partnerships',
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer id="about" className="bg-primary-500 text-gold-500 border-t border-accent-500">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-accent-500 p-2 rounded-full">
                <MapPin className="w-6 h-6 text-primary-500" />
              </div>
              <span className="text-2xl font-bold font-serif">VillageStay</span>
            </div>
            <p className="text-gold-400 mb-6 max-w-md">
              Connecting travelers with authentic village experiences across India. 
              Empowering rural communities through sustainable tourism.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-500" />
                <span className="text-sm">+91-1800-VILLAGE</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-500" />
                <span className="text-sm">hello@villagestay.in</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-accent-500">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gold-400 hover:text-accent-500 transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="border-t border-accent-500 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gold-400 hover:text-accent-500 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            
            {/* Impact Badge */}
            <div className="flex items-center space-x-4 text-sm text-gold-400">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-accent-500" />
                <span>15,247 families empowered</span>
              </div>
              <div className="flex items-center space-x-1">
                <Leaf className="w-4 h-4 text-accent-500" />
                <span>Carbon neutral platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-500 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gold-400">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4 md:mb-0">
              <a href="#" className="hover:text-accent-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-accent-500 transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-accent-500 transition-colors">Accessibility</a>
            </div>
            <div className="text-center md:text-right">
              <p>© 2024 VillageStay. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ for rural India</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;