# ==============================================================================
# STOP AND CLEANUP SCRIPT FOR WINDOWS POWERSHELL
# ==============================================================================
# This script stops all services and optionally removes volumes
# Run with: .\stop-docker.ps1
# ==============================================================================

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   Stop MA Traders Docker Services" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Ask about volume removal
Write-Host "Do you want to remove data volumes?" -ForegroundColor Yellow
Write-Host "WARNING: This will delete all database data and uploads!" -ForegroundColor Red
$removeVolumes = Read-Host "Remove volumes? (Y/N)"
Write-Host ""

if ($removeVolumes -eq "Y" -or $removeVolumes -eq "y") {
    Write-Host "Stopping services and removing volumes..." -ForegroundColor Yellow
    docker-compose down -v
    Write-Host "✅ Services stopped and volumes removed" -ForegroundColor Green
} else {
    Write-Host "Stopping services (keeping volumes)..." -ForegroundColor Yellow
    docker-compose down
    Write-Host "✅ Services stopped (data preserved)" -ForegroundColor Green
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   Cleanup Complete!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
