const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { sendEmail, emailTemplates } = require('../utils/email');
const router = express.Router();

// Validation middleware
const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('role').isIn(['traveler', 'villager'])
];

const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

// Register
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { email, password, role, firstName, lastName, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      role,
      profile: {
        firstName,
        lastName,
        phone: phone || ''
      }
    });

    await user.save();

    // Send welcome email
    try {
      const welcomeEmail = emailTemplates.welcome({
        email,
        role,
        firstName,
        lastName
      });
      
      await sendEmail({
        to: email,
        subject: welcomeEmail.subject,
        html: welcomeEmail.html
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail registration if email fails
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      message: 'Registration successful! Welcome email sent.',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        isEmailVerified: user.verification?.isEmailVerified || false
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login
router.post('/login', validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Send login notification email
    try {
      const loginEmail = emailTemplates.loginNotification({
        firstName: user.profile.firstName
      });
      
      await sendEmail({
        to: email,
        subject: loginEmail.subject,
        html: loginEmail.html
      });
    } catch (emailError) {
      console.error('Login notification email failed:', emailError);
      // Don't fail login if email fails
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        isEmailVerified: user.verification?.isEmailVerified || false
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Verify email
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({
      'verification.emailVerificationToken': token,
      'verification.emailVerificationExpires': { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    user.verification.isEmailVerified = true;
    user.verification.emailVerificationToken = undefined;
    user.verification.emailVerificationExpires = undefined;
    await user.save();

    // Send verification success email
    const verificationSuccessEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4a9960, #eab308); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 10px 10px; }
          .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Email Verified Successfully!</h1>
          </div>
          <div class="content">
            <div class="success">
              <h3>🎉 Congratulations ${user.profile.firstName}!</h3>
              <p>Your email has been successfully verified. Your VillageStay account is now fully activated!</p>
            </div>
            <p>You can now enjoy all the features of VillageStay:</p>
            <ul>
              <li>✅ Full access to all village listings</li>
              <li>✅ Direct booking capabilities</li>
              <li>✅ Host communication features</li>
              <li>✅ Review and rating system</li>
              <li>✅ Personalized recommendations</li>
            </ul>
            <p>Start exploring authentic village experiences today!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      to: user.email,
      subject: '✅ VillageStay Email Verified - Account Activated!',
      html: verificationSuccessEmail
    });

    res.json({ message: 'Email verified successfully! Your account is now fully activated.' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Email verification failed', error: error.message });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        isEmailVerified: user.verification?.isEmailVerified || false
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Logout (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;