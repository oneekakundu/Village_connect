const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    village: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    nearbyAttractions: [String]
  },
  pricing: {
    basePrice: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    maxGuests: { type: Number, required: true, min: 1 },
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 }
  },
  images: [{
    url: String,
    caption: String,
    isPrimary: { type: Boolean, default: false }
  }],
  amenities: [{
    type: String,
    enum: [
      'wifi', 'parking', 'kitchen', 'bathroom', 'ac', 'heating',
      'tv', 'washer', 'dryer', 'pool', 'gym', 'garden',
      'balcony', 'terrace', 'fireplace', 'workspace'
    ]
  }],
  experiences: [{
    name: String,
    description: String,
    duration: String,
    price: Number,
    included: { type: Boolean, default: false }
  }],
  ecoFeatures: [{
    type: String,
    enum: [
      'solar-power', 'rainwater-harvesting', 'organic-farm',
      'plastic-free', 'zero-waste', 'composting',
      'bamboo-construction', 'wind-power', 'eco-toilets'
    ]
  }],
  availability: {
    calendar: [{
      date: Date,
      available: { type: Boolean, default: true },
      price: Number
    }],
    minStay: { type: Number, default: 1 },
    maxStay: { type: Number, default: 30 },
    advanceBooking: { type: Number, default: 365 }
  },
  policies: {
    checkIn: { type: String, default: '15:00' },
    checkOut: { type: String, default: '11:00' },
    cancellation: {
      type: String,
      enum: ['flexible', 'moderate', 'strict'],
      default: 'moderate'
    },
    houseRules: [String]
  },
  languages: [{
    type: String,
    enum: ['english', 'hindi', 'bengali', 'tamil', 'telugu', 'marathi', 'gujarati', 'kannada', 'malayalam', 'punjabi']
  }],
  bookingOptions: {
    instantBook: { type: Boolean, default: false },
    smsBooking: { type: Boolean, default: true },
    callBooking: { type: Boolean, default: true }
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'active', 'inactive', 'suspended'],
    default: 'draft'
  },
  stats: {
    views: { type: Number, default: 0 },
    bookings: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Index for location-based searches
listingSchema.index({ 'location.coordinates': '2dsphere' });
listingSchema.index({ 'location.state': 1, 'location.district': 1 });
listingSchema.index({ 'pricing.basePrice': 1 });
listingSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Listing', listingSchema);