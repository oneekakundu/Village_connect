# 🚀 VillageStay Deployment Guide - Oracle Cloud

## 📋 Prerequisites

1. **Oracle Cloud Account** (Free tier available)
2. **Domain Name** (optional but recommended)
3. **GitHub Account** (for code repository)

---

## 🏗️ Step 1: Oracle Cloud Setup

### 1.1 Create Oracle Cloud Account
1. Go to [Oracle Cloud](https://www.oracle.com/cloud/free/)
2. Sign up for free tier (Always Free)
3. Verify your email and complete setup

### 1.2 Create VM Instance
```bash
# Login to Oracle Cloud Console
# Navigate to Compute > Instances > Create Instance

# Instance Configuration:
- Name: villagestay-server
- Image: Canonical Ubuntu 22.04
- Shape: VM.Standard.A1.Flex (Always Free)
- Memory: 6 GB
- OCPU: 1
- Network: Create new VCN
- Public IP: Yes
- Subnet: Public subnet
```

### 1.3 Configure Security Lists
```bash
# Add these rules to your security list:
- Port 22 (SSH) - Source: 0.0.0.0/0
- Port 80 (HTTP) - Source: 0.0.0.0/0  
- Port 443 (HTTPS) - Source: 0.0.0.0/0
- Port 5000 (Backend API) - Source: 0.0.0.0/0
- Port 3000 (Frontend) - Source: 0.0.0.0/0
```

---

## 🛠️ Step 2: Server Setup

### 2.1 Connect to Your Instance
```bash
# Download your private key from Oracle Cloud
chmod 400 your-private-key.pem

# Connect to instance
ssh -i your-private-key.pem ubuntu@YOUR_INSTANCE_IP
```

### 2.2 Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### 2.3 Install Git and Clone Repository
```bash
# Install Git
sudo apt install git -y

# Clone your repository
git clone https://github.com/yourusername/Village_connect.git
cd Village_connect
```

---

## 🔧 Step 3: Backend Deployment

### 3.1 Configure Environment Variables
```bash
# Navigate to server directory
cd server

# Create .env file
nano .env
```

**Add these environment variables:**
```env
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
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### 3.2 Install Dependencies and Start Backend
```bash
# Install dependencies
npm install

# Start with PM2
pm2 start index.js --name "villagestay-backend"

# Save PM2 configuration
pm2 save
pm2 startup
```

---

## 🌐 Step 4: Frontend Deployment

### 4.1 Build Frontend
```bash
# Navigate to root directory
cd ..

# Install frontend dependencies
npm install

# Build for production
npm run build
```

### 4.2 Configure Nginx
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/villagestay
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        root /home/ubuntu/Village_connect/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:5000;
    }
}
```

### 4.3 Enable Site and Restart Nginx
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/villagestay /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📧 Step 5: Email Setup (Resend - Free)

### 5.1 Get Resend API Key
1. Go to [Resend.com](https://resend.com/)
2. Sign up for free account
3. Get your API key
4. Add to your `.env` file

### 5.2 Test Email
```bash
# Test email sending
curl -X POST http://localhost:5000/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com"}'
```

---

## 🔒 Step 6: SSL Certificate (Optional)

### 6.1 Install Certbot
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 📊 Step 7: Monitoring

### 7.1 PM2 Monitoring
```bash
# View logs
pm2 logs villagestay-backend

# Monitor processes
pm2 monit

# View status
pm2 status
```

### 7.2 System Monitoring
```bash
# Check system resources
htop

# Check disk usage
df -h

# Check memory usage
free -h
```

---

## 🚀 Step 8: Update Frontend for Production

### 8.1 Update API URL
```typescript
// In src/contexts/AuthContext.tsx, update the API URL:
const API_BASE_URL = 'https://your-domain.com/api';

// Update all fetch calls to use this base URL
```

### 8.2 Rebuild and Deploy
```bash
# Rebuild frontend
npm run build

# Copy to Nginx directory
sudo cp -r dist/* /var/www/html/
```

---

## 🔧 Troubleshooting

### Common Issues:

1. **Port 5000 not accessible:**
   ```bash
   # Check if backend is running
   pm2 status
   
   # Check firewall
   sudo ufw status
   ```

2. **MongoDB not starting:**
   ```bash
   # Check MongoDB status
   sudo systemctl status mongod
   
   # Start MongoDB
   sudo systemctl start mongod
   ```

3. **Nginx not serving files:**
   ```bash
   # Check Nginx status
   sudo systemctl status nginx
   
   # Check Nginx configuration
   sudo nginx -t
   ```

---

## 📈 Performance Optimization

### 8.1 Enable Gzip Compression
```bash
# Add to Nginx configuration
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 8.2 Enable Caching
```bash
# Add to Nginx configuration
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 🎉 Success!

Your VillageStay application is now deployed on Oracle Cloud!

**Access URLs:**
- Frontend: `http://your-instance-ip` or `https://your-domain.com`
- Backend API: `http://your-instance-ip:5000` or `https://your-domain.com/api`
- Health Check: `http://your-instance-ip/health`

**Next Steps:**
1. Set up domain name DNS
2. Configure SSL certificate
3. Set up monitoring and alerts
4. Implement backup strategy
5. Set up CI/CD pipeline

---

## 💰 Cost Estimation (Oracle Free Tier)

- **VM Instance**: Always Free (2 AMD-based Compute VMs)
- **Storage**: Always Free (200 GB total storage)
- **Network**: Always Free
- **Total Cost**: $0/month

**Free Tier Limits:**
- 2 AMD-based Compute VMs
- 1 ARM-based Compute VM
- 24 GB memory total
- 200 GB storage
- 10 TB data transfer

---

## 📞 Support

If you encounter issues:
1. Check Oracle Cloud documentation
2. Review server logs: `pm2 logs`
3. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
4. Monitor system resources: `htop` 