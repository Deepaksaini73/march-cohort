@echo off
echo Starting Travel App Backend and Frontend...
echo =========================================
echo.

echo 1. Starting the backend server...
start cmd /k run_backend.bat

echo.
echo 2. Starting the frontend server...
start cmd /k run_frontend.bat

echo.
echo Both servers should be starting in separate windows.
echo.
echo - Backend: http://localhost:8000
echo - Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul 