# ==============================================================================
# QUICK START SCRIPT FOR WINDOWS POWERSHELL
# ==============================================================================
# This script automates the Docker deployment process
# Run with: .\start-docker.ps1
# ==============================================================================

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   MA Traders Docker Deployment" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "Checking Docker status..." -ForegroundColor Yellow
$dockerRunning = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERROR: Docker is not running!" -ForegroundColor Red
    Write-Host "Please start Docker Desktop and try again." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker is running" -ForegroundColor Green
Write-Host ""

# Navigate to project directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Stop any existing containers
Write-Host "Stopping existing containers..." -ForegroundColor Yellow
docker-compose down 2>&1 | Out-Null
Write-Host "✅ Cleaned up existing containers" -ForegroundColor Green
Write-Host ""

# Build images
Write-Host "Building Docker images (this may take 2-5 minutes)..." -ForegroundColor Yellow
docker-compose build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERROR: Failed to build Docker images" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker images built successfully" -ForegroundColor Green
Write-Host ""

# Start services
Write-Host "Starting all services..." -ForegroundColor Yellow
docker-compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERROR: Failed to start services" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Services started successfully" -ForegroundColor Green
Write-Host ""

# Wait for services to be ready
Write-Host "Waiting for services to be ready (30 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 30
Write-Host ""

# Show running containers
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   Running Containers (docker ps)" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
docker ps
Write-Host ""

# Show service URLs
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   Application URLs" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Frontend:  http://localhost:3000" -ForegroundColor Green
Write-Host "Backend:   http://localhost:3001" -ForegroundColor Green
Write-Host "MongoDB:   mongodb://localhost:27017" -ForegroundColor Green
Write-Host ""

# Show useful commands
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   Useful Commands" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "View logs:          docker-compose logs -f" -ForegroundColor Yellow
Write-Host "Stop services:      docker-compose down" -ForegroundColor Yellow
Write-Host "Restart services:   docker-compose restart" -ForegroundColor Yellow
Write-Host "View networks:      docker network ls" -ForegroundColor Yellow
Write-Host "View volumes:       docker volume ls" -ForegroundColor Yellow
Write-Host ""

# Offer to open browser
$openBrowser = Read-Host "Open frontend in browser? (Y/N)"
if ($openBrowser -eq "Y" -or $openBrowser -eq "y") {
    Start-Process "http://localhost:3000"
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   Deployment Complete! ✅" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
