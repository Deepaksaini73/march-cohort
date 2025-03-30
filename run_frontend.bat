@echo off
echo Starting the Travel App frontend...

powershell -Command "cd %~dp0frontend; npm run dev"

if %errorlevel% neq 0 (
    echo Failed to start the frontend server. Error code: %errorlevel%
    echo.
    
    echo Checking if Node.js is installed...
    powershell -Command "node --version" 2>nul
    
    if %errorlevel% neq 0 (
        echo Node.js is not installed or not in your PATH.
        echo Please make sure Node.js is installed and in your PATH.
    ) else (
        echo Node.js is installed, checking if required packages are installed...
        echo.
        echo Try running: cd frontend ^&^& npm install
    )
    
    pause
) 