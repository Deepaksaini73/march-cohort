Write-Host "Starting Travel App Backend and Frontend..." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if Python is installed
function Check-Python {
    try {
        $pythonVersion = python --version 2>&1
        Write-Host "✓ Python is installed: $pythonVersion" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "✗ Python is not installed or not in PATH" -ForegroundColor Red
        return $false
    }
}

# Function to check if Node.js is installed
function Check-Node {
    try {
        $nodeVersion = node --version 2>&1
        Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "✗ Node.js is not installed or not in PATH" -ForegroundColor Red
        return $false
    }
}

# Check requirements first
$pythonInstalled = Check-Python
$nodeInstalled = Check-Node

if (-not ($pythonInstalled -and $nodeInstalled)) {
    Write-Host "`nPlease install the missing requirements and try again." -ForegroundColor Yellow
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Start the backend server
Write-Host "`n1. Starting the backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000"

# Start the frontend server
Write-Host "`n2. Starting the frontend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host "`nBoth servers should be starting in separate windows." -ForegroundColor Green
Write-Host "`n- Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor Cyan

Write-Host "`nPress any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 