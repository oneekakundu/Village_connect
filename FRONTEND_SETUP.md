# Frontend Setup Guide

## Environment Configuration

### Option 1: Create a `.env` file (Recommended)

Copy the example file and create your `.env`:
```bash
cp env.example .env
```

Or create a `.env` file in the root directory manually:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=VillageStay
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

### Option 2: Use Default Configuration

If no `.env` file is present, the app will use these defaults:
- API URL: `http://localhost:5000/api`
- App Name: `VillageStay`
- App Version: `1.0.0`

## API Service

The frontend now includes a complete API service (`src/services/api.ts`) that:

- ✅ Uses the configured `VITE_API_URL` environment variable
- ✅ Falls back to `http://localhost:5000/api` if not set
- ✅ Provides methods for all backend endpoints:
  - Authentication (login/register)
  - User management
  - Village listings
  - Bookings
  - SMS services

## Usage

### In Components:
```typescript
import apiService from '../services/api';

// Login
const data = await apiService.login(email, password);

// Get villages
const villages = await apiService.getVillages();

// Create booking
const booking = await apiService.createBooking(token, bookingData);
```

### Environment Variables:
```typescript
import { API_URL, APP_NAME } from '../config/environment';

console.log('API URL:', API_URL);
console.log('App Name:', APP_NAME);
```

## Backend Connection

### Quick Start (Recommended)
Use the provided PowerShell script to start both servers:
```powershell
.\start-servers.ps1
```

### Manual Start
1. **Start Backend Server:**
   ```powershell
   cd server
   node index.js
   ```

2. **Start Frontend Server (in new terminal):**
   ```powershell
   npm run dev
   ```

The frontend will automatically connect to `http://localhost:5000/api` when the backend is running.

## CORS Configuration

✅ **Backend CORS is configured for your frontend:**
- CORS_ORIGIN=http://localhost:5174 (in server/config.env)
- CORS middleware is properly set up in server/index.js

## Troubleshooting

1. **API Connection Failed**: 
   - Check if backend is running on port 5000
   - Verify MongoDB is connected
   - Check browser console for CORS errors

2. **Environment Variables Not Loading**: 
   - Restart the development server after creating `.env`
   - Use `npm run dev` to restart frontend

3. **CORS Errors**: 
   - Backend CORS is configured for `http://localhost:5174`
   - Ensure both servers are running

4. **Port Already in Use**: 
   - Use the PowerShell script to automatically kill existing processes
   - Or manually kill processes: `taskkill /PID <PID> /F` 