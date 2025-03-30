@echo off
echo Checking for travel_dataset.csv file...

cd

if exist "travel_dataset.csv" (
    echo Found travel_dataset.csv in the current directory.
) else (
    echo travel_dataset.csv NOT found in the current directory.
)

echo.
echo Checking for CSV file in the project directory...

if exist "D:\march court\march-cohort\travel_dataset.csv" (
    echo Found travel_dataset.csv in the project root.
    echo Copying to the backend directory...
    copy "D:\march court\march-cohort\travel_dataset.csv" "D:\march court\march-cohort\backend\"
) else (
    echo travel_dataset.csv NOT found in the project root.
)

echo.
echo Checking in the backend directory...

if exist "D:\march court\march-cohort\backend\travel_dataset.csv" (
    echo Found travel_dataset.csv in the backend directory.
) else (
    echo travel_dataset.csv NOT found in the backend directory.
    echo.
    echo Please copy your travel_dataset.csv file to these locations:
    echo 1. D:\march court\march-cohort\
    echo 2. D:\march court\march-cohort\backend\
)

echo.
echo Modifying main.py to use the correct file path...

powershell -Command "(Get-Content 'D:\march court\march-cohort\main.py') -replace 'df = pd.read_csv\(''travel_dataset.csv''\)', 'df = pd.read_csv(os.path.join(os.path.dirname(__file__), ''travel_dataset.csv''))' | Set-Content 'D:\march court\march-cohort\main.py'"

echo.
echo Checking if os module is imported in main.py...
powershell -Command "if (-not (Select-String -Path 'D:\march court\march-cohort\main.py' -Pattern 'import os')) { (Get-Content 'D:\march court\march-cohort\main.py') -replace 'import pandas as pd', 'import pandas as pd\nimport os' | Set-Content 'D:\march court\march-cohort\main.py' }"

echo.
echo Modified main.py to use absolute file path.
echo.
echo Please try running the backend again with:
echo .\run_backend_direct.bat
echo.
pause 