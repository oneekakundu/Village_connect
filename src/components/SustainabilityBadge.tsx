import React from 'react';
import { Leaf, Award, Heart, Globe } from 'lucide-react';

interface SustainabilityBadgeProps {
  isVisible: boolean;
  onClose: () => void;
  villageName?: string;
  amount?: number;
}

const SustainabilityBadge: React.FC<SustainabilityBadgeProps> = ({ 
  isVisible, 
  onClose, 
  villageName = "VillageStay",
  amount = 0 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in">
        {/* Badge Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Leaf className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 bg-gold-500 text-white rounded-full p-2">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          🌱 Sustainability Badge Earned!
        </h2>

        {/* Message */}
        <p className="text-slate-600 mb-6">
          Thank you for supporting sustainable tourism! Your booking at{' '}
          <span className="font-semibold text-emerald-600">{villageName}</span>{' '}
          contributes to our mission of preserving village heritage and promoting eco-friendly practices.
        </p>

        {/* Impact Stats */}
        <div className="bg-emerald-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-emerald-800 mb-3">Your Impact:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>95% to Hosts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Leaf className="w-4 h-4 text-emerald-500" />
              <span>Eco-Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>Cultural Preservation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-gold-500" />
              <span>₹{amount} Contribution</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-2">Sustainability Benefits:</h3>
          <ul className="text-sm space-y-1 text-left">
            <li>• Direct support to village families</li>
            <li>• Preservation of traditional arts & crafts</li>
            <li>• Promotion of eco-friendly tourism</li>
            <li>• Cultural heritage conservation</li>
            <li>• Sustainable livelihood creation</li>
          </ul>
        </div>

        {/* Badge Details */}
        <div className="border-2 border-emerald-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Award className="w-5 h-5 text-gold-500" />
            <span className="font-semibold text-slate-800">VillageStay Sustainability Badge</span>
          </div>
          <p className="text-xs text-slate-600">
            This badge represents your contribution to sustainable tourism and village development.
            Share it on social media to inspire others!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-medium hover:bg-slate-300 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Share functionality
              if (navigator.share) {
                navigator.share({
                  title: 'I earned a Sustainability Badge on VillageStay!',
                  text: `I just contributed to sustainable tourism at ${villageName} and earned a VillageStay Sustainability Badge! 🌱`,
                  url: window.location.href
                });
              } else {
                // Fallback - copy to clipboard
                navigator.clipboard.writeText(
                  `I earned a Sustainability Badge on VillageStay for supporting sustainable tourism at ${villageName}! 🌱`
                );
                alert('Message copied to clipboard!');
              }
            }}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-medium hover:from-emerald-400 hover:to-green-500 transition-all"
          >
            Share Badge
          </button>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityBadge; 