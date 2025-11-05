@echo off
echo ====================================
echo CVD Detection System Startup Script
echo ====================================
echo.

echo [1/5] Installing backend dependencies...
cd /d "%~dp0backend"
python -m pip install --upgrade pip
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo [2/5] Training models with heart.csv data...
python notebooks\train_models.py "%~dp0heart.csv"
if %errorlevel% neq 0 (
    echo ERROR: Model training failed
    pause
    exit /b 1
)

echo.
echo [3/5] Installing frontend dependencies...
cd /d "%~dp0frontend"
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo [4/5] Starting backend server...
cd /d "%~dp0backend"
start "CVD Backend" cmd /c "python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000 & pause"

echo.
echo [5/5] Starting frontend server...
cd /d "%~dp0frontend"
start "CVD Frontend" cmd /c "npm run dev & pause"

echo.
echo ====================================
echo Both servers are starting...
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo Backend Health: http://127.0.0.1:8000/health
echo ====================================
echo.
echo Press any key to close this window...
pause > nul