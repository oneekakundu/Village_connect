const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  traveler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dates: {
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    nights: { type: Number, required: true }
  },
  guests: {
    adults: { type: Number, required: true, min: 1 },
    children: { type: Number, default: 0 },
    total: { type: Number, required: true }
  },
  pricing: {
    baseAmount: { type: Number, required: true },
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    taxes: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    hostEarnings: { type: Number, required: true },
    platformFee: { type: Number, required: true }
  },
  payment: {
    method: {
      type: String,
      enum: ['razorpay', 'stripe', 'bank_transfer', 'cash', 'sms'],
      required: true
    },
    transactionId: String,
    paymentId: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    paidAt: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'],
    default: 'pending'
  },
  communication: {
    bookingMethod: {
      type: String,
      enum: ['website', 'sms', 'phone', 'whatsapp'],
      default: 'website'
    },
    specialRequests: String,
    hostNotes: String,
    travelerNotes: String
  },
  cancellation: {
    cancelledBy: {
      type: String,
      enum: ['traveler', 'host', 'admin']
    },
    cancelledAt: Date,
    reason: String,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['pending', 'processed', 'failed']
    }
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
bookingSchema.index({ traveler: 1, createdAt: -1 });
bookingSchema.index({ host: 1, createdAt: -1 });
bookingSchema.index({ listing: 1, 'dates.checkIn': 1 });
bookingSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);