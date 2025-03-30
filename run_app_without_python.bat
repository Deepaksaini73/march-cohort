@echo off
echo Starting the Travel App...

echo.
echo Checking for Python installation...

REM Try different ways to locate Python
where py >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Python launcher (py) found.
    set PYTHON_CMD=py
    goto PYTHON_FOUND
)

python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Python found.
    set PYTHON_CMD=python
    goto PYTHON_FOUND
)

REM Check common Python installation locations
if exist "C:\Python39\python.exe" (
    echo Python found at C:\Python39\python.exe
    set PYTHON_CMD=C:\Python39\python.exe
    goto PYTHON_FOUND
)

if exist "C:\Python310\python.exe" (
    echo Python found at C:\Python310\python.exe
    set PYTHON_CMD=C:\Python310\python.exe
    goto PYTHON_FOUND
)

if exist "C:\Python311\python.exe" (
    echo Python found at C:\Python311\python.exe
    set PYTHON_CMD=C:\Python311\python.exe
    goto PYTHON_FOUND
)

if exist "C:\Python312\python.exe" (
    echo Python found at C:\Python312\python.exe
    set PYTHON_CMD=C:\Python312\python.exe
    goto PYTHON_FOUND
)

if exist "%LOCALAPPDATA%\Programs\Python\Python39\python.exe" (
    echo Python found at %LOCALAPPDATA%\Programs\Python\Python39\python.exe
    set PYTHON_CMD=%LOCALAPPDATA%\Programs\Python\Python39\python.exe
    goto PYTHON_FOUND
)

if exist "%LOCALAPPDATA%\Programs\Python\Python310\python.exe" (
    echo Python found at %LOCALAPPDATA%\Programs\Python\Python310\python.exe
    set PYTHON_CMD=%LOCALAPPDATA%\Programs\Python\Python310\python.exe
    goto PYTHON_FOUND
)

if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" (
    echo Python found at %LOCALAPPDATA%\Programs\Python\Python311\python.exe
    set PYTHON_CMD=%LOCALAPPDATA%\Programs\Python\Python311\python.exe
    goto PYTHON_FOUND
)

if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" (
    echo Python found at %LOCALAPPDATA%\Programs\Python\Python312\python.exe
    set PYTHON_CMD=%LOCALAPPDATA%\Programs\Python\Python312\python.exe
    goto PYTHON_FOUND
)

:PYTHON_NOT_FOUND
echo ERROR: Python not found in common locations.
echo Please install Python from https://python.org/downloads/
echo After installing, make sure to check "Add Python to PATH" during installation.
echo.
pause
exit /b 1

:PYTHON_FOUND
echo Using Python: %PYTHON_CMD%

echo.
echo Starting the backend server...
start cmd /c "cd backend && %PYTHON_CMD% -m uvicorn app:app --reload --host 0.0.0.0 --port 8000"

echo.
echo Starting the frontend server...
start cmd /c "cd frontend && npm run dev"

echo.
echo Both servers starting in separate windows.
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause 