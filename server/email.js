const express = require('express');
const router = express.Router();

// Placeholder email route
router.post('/send', (req, res) => {
  res.json({ message: 'Email sent successfully (dummy)' });
});

module.exports = router;
