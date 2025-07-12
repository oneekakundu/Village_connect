const nodemailer = require('nodemailer');

// Resend API for free email sending
const sendEmailWithResend = async ({ to, subject, html }) => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || 'noreply@villagestay.com',
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Email sending failed');
    }

    const result = await response.json();
    console.log('✅ Email sent successfully via Resend:', result.id);
    return result;
  } catch (error) {
    console.error('❌ Resend email error:', error);
    throw error;
  }
};

// SMTP fallback
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password'
  }
});

const sendEmailWithSMTP = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@villagestay.com',
      to,
      subject,
      html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via SMTP:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ SMTP email error:', error);
    throw error;
  }
};

// Main email sending function
const sendEmail = async ({ to, subject, html }) => {
  // Try Resend first (free), fallback to SMTP
  if (process.env.RESEND_API_KEY) {
    try {
      return await sendEmailWithResend({ to, subject, html });
    } catch (error) {
      console.log('⚠️ Resend failed, trying SMTP...');
      return await sendEmailWithSMTP({ to, subject, html });
    }
  } else {
    return await sendEmailWithSMTP({ to, subject, html });
  }
};

// Email templates
const emailTemplates = {
  welcome: (userData) => ({
    subject: `🏡 Welcome to VillageStay - ${userData.role} Account Created!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4a9960, #eab308); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: #fff; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #4a9960; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏡 Welcome to VillageStay!</h1>
            <p>Your ${userData.role} account has been created successfully</p>
          </div>
          <div class="content">
            <h2>Hello ${userData.firstName}!</h2>
            <p>Welcome to VillageStay! Your account has been created successfully.</p>
            
            <div class="highlight">
              <h3>📋 Account Details:</h3>
              <ul>
                <li><strong>Email:</strong> ${userData.email}</li>
                <li><strong>Role:</strong> ${userData.role}</li>
                <li><strong>Name:</strong> ${userData.firstName} ${userData.lastName}</li>
              </ul>
            </div>
            
            <p>You can now start exploring villages or hosting travelers!</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),
  
  loginNotification: (userData) => ({
    subject: '🏡 VillageStay Login Notification',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4a9960, #eab308); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f6f3; padding: 20px; border-radius: 0 0 10px 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🏡 Login Successful</h2>
          </div>
          <div class="content">
            <p>Hello ${userData.firstName},</p>
            <p>You've successfully logged into your VillageStay account.</p>
            <p><strong>Login Time:</strong> ${new Date().toLocaleString('en-IN')}</p>
            <p>If this wasn't you, please contact us immediately.</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

module.exports = { sendEmail, emailTemplates };