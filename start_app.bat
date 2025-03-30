@echo off
echo Starting the Travel App using main.py functions...

echo.
echo Starting the backend server...
start cmd /c "cd backend && python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000"

echo.
echo Starting the frontend server...
start cmd /c "cd frontend && npm run dev"

echo.
echo Both servers should be starting in separate windows.
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo The frontend form will use your main.py functions to fetch data:
echo - process_search_form_data
echo - extract_hotels_restaurants_attractions
echo - fetch_weather_forecast
echo - fetch_hotels_from_api
echo - fetch_restaurants_from_api
echo.
echo Press any key to close this window...
pause 