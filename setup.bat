@echo off
REM ========================================
REM CVD Detection System - Windows Setup
REM ========================================

echo.
echo ========================================
echo CVD Detection System Setup
echo ========================================
echo.

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed!
    echo Please install Python 3.9+ from https://www.python.org/
    pause
    exit /b 1
)
echo [OK] Python found

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js found

echo.
echo ========================================
echo Setting up Backend...
echo ========================================
echo.

cd backend

REM Create virtual environment
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Install dependencies
echo Installing Python dependencies...
pip install --upgrade pip
pip install -r requirements.txt

echo.
echo ========================================
echo Training ML Models...
echo ========================================
echo.

cd notebooks
python train_models.py
cd ..

cd ..

echo.
echo ========================================
echo Setting up Frontend...
echo ========================================
echo.

cd frontend

REM Check for pnpm
pnpm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using pnpm...
    pnpm install
) else (
    echo Using npm...
    npm install
)

REM Create .env.local
if not exist .env.local (
    echo Creating .env.local...
    echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local
)

cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Backend (in one terminal):
echo    cd backend
echo    venv\Scripts\activate
echo    uvicorn main:app --reload --host 0.0.0.0 --port 8000
echo.
echo 2. Frontend (in another terminal):
echo    cd frontend
echo    pnpm dev (or npm run dev)
echo.
echo Then open: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
echo ========================================
echo.

pause
