const express = require('express');
const User = require('../models/User');
const Listing = require('../models/Listing');
const Booking = require('../models/Booking');
const { authenticateToken, requireRole } = require('../middleware/auth');
const router = express.Router();

// Get dashboard stats
router.get('/stats', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVillagers = await User.countDocuments({ role: 'villager' });
    const totalTravelers = await User.countDocuments({ role: 'traveler' });
    const totalListings = await Listing.countDocuments();
    const activeListings = await Listing.countDocuments({ status: 'active' });
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    
    const totalRevenue = await Booking.aggregate([
      { $match: { 'payment.status': 'completed' } },
      { $group: { _id: null, total: { $sum: '$pricing.totalAmount' } } }
    ]);

    res.json({
      users: { total: totalUsers, villagers: totalVillagers, travelers: totalTravelers },
      listings: { total: totalListings, active: activeListings },
      bookings: { total: totalBookings, completed: completedBookings },
      revenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
});

module.exports = router;