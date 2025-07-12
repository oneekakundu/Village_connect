# Village Connect - Server Startup Script
# This script starts both the backend and frontend servers

Write-Host "🚀 Starting Village Connect Servers..." -ForegroundColor Green

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    return $connection -ne $null
}

# Function to kill process on a port
function Stop-ProcessOnPort {
    param([int]$Port)
    $process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($process) {
        $processId = $process.OwningProcess
        Write-Host "🛑 Stopping process on port $Port (PID: $processId)" -ForegroundColor Yellow
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
}

# Check and kill processes on ports 5000 and 5173
Write-Host "🔍 Checking for existing processes..." -ForegroundColor Cyan

if (Test-Port -Port 5000) {
    Write-Host "⚠️  Port 5000 is in use. Stopping existing process..." -ForegroundColor Yellow
    Stop-ProcessOnPort -Port 5000
}

if (Test-Port -Port 5174) {
    Write-Host "⚠️  Port 5174 is in use. Stopping existing process..." -ForegroundColor Yellow
    Stop-ProcessOnPort -Port 5174
}

# Start Backend Server
Write-Host "🖥️  Starting Backend Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; node index.js" -WindowStyle Normal

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start Frontend Server
Write-Host "🌐 Starting Frontend Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host "✅ Both servers should now be running!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:5174" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📊 API Health: http://localhost:5000/health" -ForegroundColor Cyan

Write-Host "`n💡 Tips:" -ForegroundColor Yellow
Write-Host "   - Backend logs will show in the first PowerShell window" -ForegroundColor White
Write-Host "   - Frontend logs will show in the second PowerShell window" -ForegroundColor White
Write-Host "   - Press Ctrl+C in each window to stop the servers" -ForegroundColor White 