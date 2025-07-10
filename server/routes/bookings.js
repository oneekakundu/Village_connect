const express = require('express');
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const { authenticateToken } = require('../middleware/auth');
const { sendEmail } = require('../utils/email');
const router = express.Router();

// Create booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      listingId,
      checkIn,
      checkOut,
      guests,
      paymentMethod = 'razorpay'
    } = req.body;

    const listing = await Listing.findById(listingId).populate('host');
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Calculate dates and pricing
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    const baseAmount = listing.pricing.basePrice * nights;
    const cleaningFee = listing.pricing.cleaningFee || 0;
    const serviceFee = Math.round(baseAmount * 0.03); // 3% service fee
    const taxes = Math.round(baseAmount * 0.12); // 12% GST
    const totalAmount = baseAmount + cleaningFee + serviceFee + taxes;
    
    const platformFee = Math.round(totalAmount * 0.15); // 15% platform fee
    const hostEarnings = totalAmount - platformFee;

    const booking = new Booking({
      listing: listingId,
      traveler: req.user.userId,
      host: listing.host._id,
      dates: {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights
      },
      guests,
      pricing: {
        baseAmount,
        cleaningFee,
        serviceFee,
        taxes,
        totalAmount,
        hostEarnings,
        platformFee
      },
      payment: {
        method: paymentMethod,
        status: paymentMethod === 'sms' ? 'pending' : 'pending'
      }
    });

    await booking.save();

    // Send confirmation emails
    const bookingConfirmation = `
      <h2>Booking Confirmation - VillageStay</h2>
      <p>Your booking has been confirmed!</p>
      <p><strong>Booking Details:</strong></p>
      <ul>
        <li>Listing: ${listing.title}</li>
        <li>Check-in: ${checkInDate.toLocaleDateString()}</li>
        <li>Check-out: ${checkOutDate.toLocaleDateString()}</li>
        <li>Guests: ${guests.total}</li>
        <li>Total Amount: ₹${totalAmount}</li>
      </ul>
      <p>Have a wonderful stay!</p>
    `;

    await sendEmail({
      to: req.user.email,
      subject: 'Booking Confirmation - VillageStay',
      html: bookingConfirmation
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
});

// Get user bookings
router.get('/my-bookings', authenticateToken, async (req, res) => {
  try {
    const filter = req.user.role === 'traveler' 
      ? { traveler: req.user.userId }
      : { host: req.user.userId };

    const bookings = await Booking.find(filter)
      .populate('listing', 'title images location pricing')
      .populate('traveler', 'profile.firstName profile.lastName profile.phone')
      .populate('host', 'profile.firstName profile.lastName profile.phone')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
});

// Update booking status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check authorization
    if (req.user.role === 'traveler' && booking.traveler.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (req.user.role === 'villager' && booking.host.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking', error: error.message });
  }
});

module.exports = router;