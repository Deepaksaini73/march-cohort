@echo off
echo Running backend directly with Python...

:: Try multiple Python paths
set PYTHON_PATHS="C:\Program Files\Python312\python.exe" "C:\Program Files\Python311\python.exe" "C:\Program Files\Python310\python.exe" "C:\Program Files\Python39\python.exe" "C:\Python312\python.exe" "C:\Python311\python.exe" "C:\Python310\python.exe" "C:\Python39\python.exe" "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" "%LOCALAPPDATA%\Programs\Python\Python310\python.exe" "%LOCALAPPDATA%\Programs\Python\Python39\python.exe"

:: Find the first Python that exists
for %%p in (%PYTHON_PATHS%) do (
    if exist %%p (
        echo Found Python at: %%p
        echo Running backend with this Python...
        cd backend
        %%p -m uvicorn app:app --reload --host 0.0.0.0 --port 8000
        goto :END
    )
)

echo Python not found in common locations.
echo.
echo Try one of these solutions:
echo 1. Install Python from https://www.python.org/downloads/
echo 2. Make sure "Add Python to PATH" is checked during installation
echo 3. Disable Microsoft Store redirection:
echo    - Press Windows key
echo    - Type "Manage app execution aliases"
echo    - Turn OFF both python.exe and python3.exe entries
echo.
pause

:END 