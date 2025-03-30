@echo off
echo This script will download and install Python for you.
echo.

:: Create a temporary directory
mkdir temp_python_install 2>nul
cd temp_python_install

echo Downloading Python installer...
:: Use PowerShell to download the Python installer
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://www.python.org/ftp/python/3.11.8/python-3.11.8-amd64.exe', 'python_installer.exe')"

echo.
echo Running Python installer...
echo.
echo IMPORTANT INSTALLATION INSTRUCTIONS:
echo 1. Select "Add Python to PATH" checkbox on the first screen
echo 2. Choose "Customize installation"
echo 3. In the next screen, make sure all optional features are selected
echo 4. In the Advanced Options, select:
echo    - Install for all users
echo    - Associate files with Python
echo    - Create shortcuts for installed applications
echo    - Add Python to environment variables
echo    - Precompile standard library
echo 5. Click Install
echo.
echo Press any key to start the installer...
pause

:: Run the installer
python_installer.exe

echo.
echo After installation completes:
echo 1. Close and reopen any command prompts
echo 2. Run "run_backend_direct.bat" to start the backend
echo.
pause 