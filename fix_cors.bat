@echo off
echo Checking and fixing CORS settings in your backend...

cd backend

echo.
echo Current CORS settings in app.py:
findstr /C:"allow_origins" app.py

echo.
echo Ensuring CORS is properly configured...

powershell -Command "(Get-Content app.py) -replace 'allow_origins=\[\"[^\"]*\"\]', 'allow_origins=[\"*\"]' | Set-Content app.py"

echo.
echo Updated CORS settings:
findstr /C:"allow_origins" app.py

echo.
echo CORS has been configured to allow all origins.
echo If you're still having "Failed to fetch" errors, please:
echo 1. Check that your backend is running on port 8000
echo 2. Check that your frontend is connecting to http://localhost:8000
echo 3. Make sure you have CORS enabled in the backend
echo.
echo Run run_app_without_python.bat to restart your application
echo.
pause 