@echo off
echo Starting the Travel API backend...

powershell -Command "cd %~dp0backend; python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000"

if %errorlevel% neq 0 (
    echo Failed to start the backend server. Error code: %errorlevel%
    echo.
    
    echo Checking if Python is installed...
    powershell -Command "python --version" 2>nul
    
    if %errorlevel% neq 0 (
        echo Python is not installed or not in your PATH.
        echo Please make sure Python is installed and in your PATH.
    ) else (
        echo Python is installed, checking if required packages are installed...
        echo.
        echo Try running: pip install -r requirements.txt
    )
    
    pause
) 