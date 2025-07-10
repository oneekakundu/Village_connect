const express = require('express');
const Listing = require('../models/Listing');
const { authenticateToken, requireRole } = require('../middleware/auth');
const router = express.Router();

// Get all listings with filters
router.get('/', async (req, res) => {
  try {
    const {
      state,
      district,
      minPrice,
      maxPrice,
      ecoFeatures,
      experiences,
      page = 1,
      limit = 12
    } = req.query;

    const filter = { status: 'active' };

    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (district) filter['location.district'] = new RegExp(district, 'i');
    if (minPrice || maxPrice) {
      filter['pricing.basePrice'] = {};
      if (minPrice) filter['pricing.basePrice'].$gte = Number(minPrice);
      if (maxPrice) filter['pricing.basePrice'].$lte = Number(maxPrice);
    }
    if (ecoFeatures) filter.ecoFeatures = { $in: ecoFeatures.split(',') };
    if (experiences) filter['experiences.name'] = { $in: experiences.split(',') };

    const listings = await Listing.find(filter)
      .populate('host', 'profile.firstName profile.lastName profile.avatar stats.rating')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Listing.countDocuments(filter);

    res.json({
      listings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch listings', error: error.message });
  }
});

// Get single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('host', 'profile stats verification');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Increment view count
    listing.stats.views += 1;
    await listing.save();

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch listing', error: error.message });
  }
});

// Create listing (villagers only)
router.post('/', authenticateToken, requireRole('villager'), async (req, res) => {
  try {
    const listingData = {
      ...req.body,
      host: req.user.userId
    };

    const listing = new Listing(listingData);
    await listing.save();

    res.status(201).json({ message: 'Listing created successfully', listing });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create listing', error: error.message });
  }
});

// Update listing
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const listing = await Listing.findOne({
      _id: req.params.id,
      host: req.user.userId
    });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found or unauthorized' });
    }

    Object.assign(listing, req.body);
    await listing.save();

    res.json({ message: 'Listing updated successfully', listing });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update listing', error: error.message });
  }
});

// Delete listing
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({
      _id: req.params.id,
      host: req.user.userId
    });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found or unauthorized' });
    }

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete listing', error: error.message });
  }
});

module.exports = router;