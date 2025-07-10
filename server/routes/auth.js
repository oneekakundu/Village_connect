const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendEmail } = require('../utils/email');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, firstName, lastName, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = new User({
      email,
      password,
      role,
      profile: {
        firstName,
        lastName,
        phone
      },
      verification: {
        emailVerificationToken,
        emailVerificationExpires
      }
    });

    await user.save();

    // Send welcome email with enhanced design
    const welcomeEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4a9960, #eab308); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #4a9960; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
          .highlight { background: #fff; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #4a9960; }
          .footer { text-align: center; margin-top: 30px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏡 Welcome to VillageStay!</h1>
            <p>Authentic Village Experiences Await You</p>
          </div>
          <div class="content">
            <h2>Namaste ${firstName} ${lastName}! 🙏</h2>
            <p>Thank you for joining VillageStay as a <strong>${role}</strong>. We're thrilled to have you as part of our community that's transforming rural tourism in India!</p>
            
            <div class="highlight">
              <h3>📋 Your Account Details:</h3>
              <ul>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Role:</strong> ${role.charAt(0).toUpperCase() + role.slice(1)}</li>
                <li><strong>Registration Date:</strong> ${new Date().toLocaleDateString('en-IN')}</li>
                <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
              </ul>
            </div>

            ${role === 'traveler' ? `
              <h3>🌟 As a Traveler, you can:</h3>
              <ul>
                <li>🏘️ Explore 2,500+ authentic villages across India</li>
                <li>🤝 Connect directly with village hosts (no middlemen!)</li>
                <li>🎨 Experience traditional arts, crafts, and cuisine</li>
                <li>🌱 Support sustainable and eco-friendly tourism</li>
                <li>📱 Book via website, SMS, or phone calls</li>
              </ul>
            ` : `
              <h3>🏡 As a Village Host, you can:</h3>
              <ul>
                <li>📝 Create beautiful listings for your village stay</li>
                <li>💰 Earn 95% of booking revenue directly</li>
                <li>🌍 Share your culture with travelers worldwide</li>
                <li>📞 Receive bookings via multiple channels</li>
                <li>🤝 Join a community of 15,000+ empowered families</li>
              </ul>
            `}

            <div style="text-align: center;">
              <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-email?token=${emailVerificationToken}" class="button">
                ✅ Verify Your Email Address
              </a>
            </div>

            <div class="highlight">
              <h3>🎯 What Makes VillageStay Special:</h3>
              <ul>
                <li>🚫 <strong>No Middlemen:</strong> Direct connection with village families</li>
                <li>💚 <strong>95% to Hosts:</strong> Fair revenue sharing</li>
                <li>🌱 <strong>Sustainable Tourism:</strong> Eco-friendly practices</li>
                <li>🏆 <strong>4.8/5 Rating:</strong> From 50,000+ happy travelers</li>
                <li>📱 <strong>Multiple Booking Options:</strong> Online, SMS, or phone</li>
              </ul>
            </div>

            <p><strong>Need Help?</strong> Our support team is here for you:</p>
            <ul>
              <li>📞 Call: +91-1800-VILLAGE</li>
              <li>📧 Email: hello@villagestay.in</li>
              <li>💬 WhatsApp: Available 24/7</li>
            </ul>

            <p>Welcome to authentic village experiences! 🌾</p>
          </div>
          <div class="footer">
            <p>Best regards,<br><strong>The VillageStay Team</strong></p>
            <p>🏡 Connecting Hearts, Preserving Heritage 🏡</p>
            <p style="font-size: 12px; color: #999;">
              This email was sent to ${email}. If you didn't create this account, please ignore this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      to: email,
      subject: `🏡 Welcome to VillageStay - Verify Your Email (${role.charAt(0).toUpperCase() + role.slice(1)} Account)`,
      html: welcomeEmailContent
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful! Please check your email for verification and account details.',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        isEmailVerified: user.verification.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Send login notification email
    const loginEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4a9960, #eab308); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f6f3; padding: 20px; border-radius: 0 0 10px 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🏡 Welcome Back to VillageStay!</h2>
          </div>
          <div class="content">
            <p>Hello ${user.profile.firstName},</p>
            <p>You've successfully logged into your VillageStay account.</p>
            <p><strong>Login Details:</strong></p>
            <ul>
              <li>Time: ${new Date().toLocaleString('en-IN')}</li>
              <li>Account Type: ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</li>
            </ul>
            <p>If this wasn't you, please contact us immediately at hello@villagestay.in</p>
            <p>Happy exploring! 🌾</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      to: email,
      subject: '🏡 VillageStay Login Notification',
      html: loginEmailContent
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        isEmailVerified: user.verification.isEmailVerified
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

module.exports = router;