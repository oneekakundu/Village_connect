const express = require('express');
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const User = require('../models/User');
const router = express.Router();

// SMS booking simulation
router.post('/booking', async (req, res) => {
  try {
    const { phone, listingId, checkIn, checkOut, guests } = req.body;

    // Find user by phone
    const traveler = await User.findOne({ 'profile.phone': phone });
    if (!traveler) {
      return res.status(404).json({ message: 'User not found with this phone number' });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Create SMS booking
    const booking = new Booking({
      listing: listingId,
      traveler: traveler._id,
      host: listing.host,
      dates: {
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        nights: Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
      },
      guests: { adults: guests, total: guests },
      pricing: {
        baseAmount: listing.pricing.basePrice,
        totalAmount: listing.pricing.basePrice,
        hostEarnings: listing.pricing.basePrice * 0.85,
        platformFee: listing.pricing.basePrice * 0.15
      },
      payment: {
        method: 'sms',
        status: 'pending'
      },
      communication: {
        bookingMethod: 'sms'
      }
    });

    await booking.save();

    res.json({ 
      message: 'SMS booking created successfully. Host will contact you for confirmation.',
      bookingId: booking._id
    });
  } catch (error) {
    res.status(500).json({ message: 'SMS booking failed', error: error.message });
  }
});

module.exports = router;