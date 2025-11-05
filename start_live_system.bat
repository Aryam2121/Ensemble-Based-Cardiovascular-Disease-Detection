@echo off
echo.
echo ============================================================
echo   Cardiovascular Disease Detection System - Live Deployment
echo ============================================================
echo.
echo Backend (Live on Render): https://ensemble-based-cardiovascular-disease.onrender.com
echo   - Health Check:  https://ensemble-based-cardiovascular-disease.onrender.com/health
echo   - API Docs:      https://ensemble-based-cardiovascular-disease.onrender.com/docs
echo   - Predict:       https://ensemble-based-cardiovascular-disease.onrender.com/predict
echo.
echo Testing Live Backend...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://ensemble-based-cardiovascular-disease.onrender.com/health' -UseBasicParsing; Write-Host 'Backend Status: ONLINE' -ForegroundColor Green; $response.Content } catch { Write-Host 'Backend Status: OFFLINE' -ForegroundColor Red; $_.Exception.Message }"
echo.
echo To start frontend:
echo   1. Option A - Use batch script: start_frontend.bat
echo   2. Option B - Manual commands:
echo      cd frontend
echo      npm run dev
echo.
echo Frontend will be available at: http://localhost:3000
echo.
echo To test the live API: test_live_backend.bat
echo ============================================================
pause