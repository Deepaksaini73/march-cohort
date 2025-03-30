@echo off
echo Starting the Travel App...

echo Starting the backend server...
start cmd /c "cd backend && python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000"

echo Starting the frontend server...
start cmd /c "cd frontend && npm run dev"

echo Both servers should be starting in separate windows.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause 