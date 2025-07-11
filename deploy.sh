#!/bin/bash

# 🚀 VillageStay Deployment Script for Oracle Cloud
# Run this script on your Oracle Cloud VM instance

echo "🚀 Starting VillageStay deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Update system
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
print_status "Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
print_status "Installing MongoDB..."
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start and enable MongoDB
print_status "Starting MongoDB..."
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2
print_status "Installing PM2..."
sudo npm install -g pm2

# Install Nginx
print_status "Installing Nginx..."
sudo apt install nginx -y

# Install Git
print_status "Installing Git..."
sudo apt install git -y

# Create application directory
print_status "Setting up application directory..."
mkdir -p /home/ubuntu/villagestay
cd /home/ubuntu/villagestay

# Clone repository (replace with your actual repository URL)
print_status "Cloning repository..."
git clone https://github.com/yourusername/Village_connect.git
cd Village_connect

# Install backend dependencies
print_status "Installing backend dependencies..."
cd server
npm install

# Create .env file
print_status "Creating environment configuration..."
cat > .env << EOF
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/villagestay

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration (Resend - Free)
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=noreply@villagestay.com

# Security Configuration
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
EOF

print_warning "Please update the .env file with your actual values!"

# Start backend with PM2
print_status "Starting backend server..."
pm2 start index.js --name "villagestay-backend"
pm2 save
pm2 startup

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd ..
npm install

# Build frontend
print_status "Building frontend..."
npm run build

# Configure Nginx
print_status "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/villagestay > /dev/null << EOF
server {
    listen 80;
    server_name _;

    # Frontend
    location / {
        root /home/ubuntu/villagestay/Village_connect/dist;
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:5000;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/villagestay /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
print_status "Testing Nginx configuration..."
sudo nginx -t
sudo systemctl restart nginx

# Create uploads directory
print_status "Creating uploads directory..."
mkdir -p /home/ubuntu/villagestay/Village_connect/server/uploads

# Set permissions
print_status "Setting permissions..."
sudo chown -R ubuntu:ubuntu /home/ubuntu/villagestay
sudo chmod -R 755 /home/ubuntu/villagestay

# Display status
print_status "Deployment completed!"
echo ""
echo "📊 Status:"
pm2 status
echo ""
echo "🌐 Nginx status:"
sudo systemctl status nginx --no-pager -l
echo ""
echo "🗄️ MongoDB status:"
sudo systemctl status mongod --no-pager -l
echo ""
echo "🔗 Access URLs:"
echo "   Frontend: http://$(curl -s ifconfig.me)"
echo "   Backend API: http://$(curl -s ifconfig.me):5000"
echo "   Health Check: http://$(curl -s ifconfig.me)/health"
echo ""
print_warning "Next steps:"
echo "1. Update .env file with your actual values"
echo "2. Get Resend API key from https://resend.com"
echo "3. Configure domain name (optional)"
echo "4. Set up SSL certificate (optional)"
echo ""
print_status "Deployment script completed successfully! 🎉" 