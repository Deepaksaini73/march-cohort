@echo off
echo Installing required packages for the Travel App backend...

:: Try multiple Python paths
set PYTHON_PATHS="C:\Program Files\Python311\python.exe" "C:\Program Files\Python312\python.exe" "C:\Program Files\Python310\python.exe" "C:\Program Files\Python39\python.exe" "C:\Python312\python.exe" "C:\Python311\python.exe" "C:\Python310\python.exe" "C:\Python39\python.exe" "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" "%LOCALAPPDATA%\Programs\Python\Python310\python.exe" "%LOCALAPPDATA%\Programs\Python\Python39\python.exe"

:: Find the first Python that exists
for %%p in (%PYTHON_PATHS%) do (
    if exist %%p (
        echo Found Python at: %%p
        set PYTHON_PATH=%%p
        goto PYTHON_FOUND
    )
)

echo Python not found in common locations.
echo Please run install_python.bat first.
pause
exit /b 1

:PYTHON_FOUND
echo Using Python: %PYTHON_PATH%

cd backend

echo.
echo Creating requirements.txt file...

echo fastapi>=0.95.0 > requirements.txt
echo uvicorn>=0.22.0 >> requirements.txt
echo pydantic>=1.10.7 >> requirements.txt
echo requests>=2.28.2 >> requirements.txt
echo numpy>=1.24.3 >> requirements.txt
echo pandas>=2.0.0 >> requirements.txt

echo.
echo Requirements file created with these packages:
type requirements.txt

echo.
echo Installing packages...
%PYTHON_PATH% -m pip install -r requirements.txt

echo.
echo Packages installed successfully!
echo.
echo Now you can run the backend with:
echo .\run_backend_direct.bat
echo.
pause 