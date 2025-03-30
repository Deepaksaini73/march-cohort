@echo off
echo Installing required packages for the Travel App...

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
echo You might see an error about Python not being found. If you do:
echo 1. Press Windows key
echo 2. Type "Manage app execution aliases"
echo 3. Turn OFF "python.exe" and "python3.exe" app installer entries
echo.
echo Trying to install with 'python -m pip'...
python -m pip install -r requirements.txt

echo.
echo If that didn't work, trying with 'py -m pip'...
py -m pip install -r requirements.txt

echo.
echo If neither worked, please run one of these commands manually:
echo pip install -r requirements.txt
echo python -m pip install -r requirements.txt
echo py -m pip install -r requirements.txt
echo.
echo After installing the requirements, run start_with_python_path.bat
echo.
pause 