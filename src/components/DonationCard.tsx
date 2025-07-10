import React, { useState } from 'react';
import { Heart, Gift, Users, TreePine, X, CreditCard } from 'lucide-react';

const DonationCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [isProcessing, setIsProcessing] = useState(false);

  const donationOptions = [
    {
      amount: 100,
      impact: 'School supplies for 1 child',
      icon: Gift,
    },
    {
      amount: 500,
      impact: 'Water filter for 1 family',
      icon: Users,
    },
    {
      amount: 1000,
      impact: 'Solar lamp for 1 household',
      icon: TreePine,
    },
  ];

  const handleDonate = async () => {
    setIsProcessing(true);
    // Simulate donation processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsExpanded(false);
      alert(`Thank you for your donation of ₹${selectedAmount}!`);
    }, 2000);
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-accent-500 to-gold-500 text-primary-500 p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-slow border border-accent-500"
        >
          <Heart className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-primary-200 rounded-2xl shadow-2xl border-2 border-accent-500 p-6 w-80 max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-accent-500" />
            <h3 className="font-bold text-gold-500">Support a Village</h3>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-gold-400 hover:text-accent-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-gold-400 mb-4">
          Help us improve rural infrastructure and support village communities.
        </p>

        {/* Donation Options */}
        <div className="space-y-3 mb-4">
          {donationOptions.map((option) => (
            <button
              key={option.amount}
              onClick={() => setSelectedAmount(option.amount)}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedAmount === option.amount
                  ? 'border-accent-500 bg-accent-500 bg-opacity-20'
                  : 'border-accent-500 hover:border-accent-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  selectedAmount === option.amount ? 'bg-accent-500' : 'bg-primary-300'
                }`}>
                  <option.icon className={`w-4 h-4 ${
                    selectedAmount === option.amount ? 'text-primary-500' : 'text-gold-500'
                  }`} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gold-500">₹{option.amount}</div>
                  <div className="text-xs text-gold-400">{option.impact}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gold-500 mb-2">
            Custom Amount
          </label>
          <input
            type="number"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value))}
            className="w-full px-3 py-2 bg-primary-300 border border-accent-500 rounded-lg text-gold-500 placeholder-gold-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
            placeholder="Enter amount"
            min="50"
          />
        </div>

        {/* Donate Button */}
        <button 
          onClick={handleDonate}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-accent-500 to-gold-500 text-primary-500 py-3 rounded-lg font-medium hover:from-accent-400 hover:to-gold-400 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <CreditCard className="w-4 h-4" />
          <span>
            {isProcessing ? 'Processing...' : `Donate ₹${selectedAmount}`}
          </span>
        </button>

        {/* Note */}
        <p className="text-xs text-gold-400 mt-2 text-center">
          100% of donations go directly to village projects
        </p>
      </div>
    </div>
  );
};

export default DonationCard;