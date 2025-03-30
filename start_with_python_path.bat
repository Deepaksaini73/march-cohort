@echo off
echo Starting Travel App...

REM Try these common Python paths
set PYTHON_PATHS=^
C:\Python312\python.exe^
C:\Python311\python.exe^
C:\Python310\python.exe^
C:\Python39\python.exe^
C:\Program Files\Python312\python.exe^
C:\Program Files\Python311\python.exe^
C:\Program Files\Python310\python.exe^
C:\Program Files\Python39\python.exe^
%LOCALAPPDATA%\Programs\Python\Python312\python.exe^
%LOCALAPPDATA%\Programs\Python\Python311\python.exe^
%LOCALAPPDATA%\Programs\Python\Python310\python.exe^
%LOCALAPPDATA%\Programs\Python\Python39\python.exe

REM This will hold our Python path once found
set PYTHON_PATH=

REM Check each possible path
for %%p in (%PYTHON_PATHS%) do (
    if exist %%p (
        echo Found Python at: %%p
        set PYTHON_PATH=%%p
        goto PYTHON_FOUND
    )
)

if "%PYTHON_PATH%"=="" (
    echo Python not found in common locations.
    echo Please enter the full path to your Python executable:
    set /p PYTHON_PATH=
    
    if not exist "%PYTHON_PATH%" (
        echo The specified Python path does not exist.
        pause
        exit /b 1
    )
)

:PYTHON_FOUND
echo Using Python: %PYTHON_PATH%

echo Starting backend server...
start cmd /k "cd backend && "%PYTHON_PATH%" -m uvicorn app:app --reload --host 0.0.0.0 --port 8000"

echo Starting frontend server...
start cmd /k "cd frontend && npm run dev"

echo Both servers should be starting in separate windows.
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause 