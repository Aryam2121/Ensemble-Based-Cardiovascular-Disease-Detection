@echo off
echo Starting Cardiovascular Disease Detection System
echo.
echo Starting Backend in Docker...
docker-compose up -d
echo.
echo Waiting for backend to be ready...
timeout /t 10 /nobreak > nul
echo.
echo Backend Status:
docker ps --filter "name=cvd-backend" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo.
echo Testing backend health...
powershell -Command "try { $response = Invoke-WebRequest -Uri http://localhost:8000/health -UseBasicParsing; Write-Host 'Backend Health: OK' -ForegroundColor Green; $response.Content } catch { Write-Host 'Backend Health: FAILED' -ForegroundColor Red; $_.Exception.Message }"
echo.
echo.
echo ============================================================
echo   Cardiovascular Disease Detection System - Docker Setup
echo ============================================================
echo.
echo Backend (FastAPI): http://localhost:8000
echo   - Health Check:  http://localhost:8000/health
echo   - API Docs:      http://localhost:8000/docs
echo   - Predict:       http://localhost:8000/predict
echo.
echo To start frontend manually:
echo   cd frontend
echo   set NEXT_PUBLIC_API_URL=http://localhost:8000
echo   npm run dev
echo.
echo Frontend will be available at: http://localhost:3000
echo.
echo To stop the system: docker-compose down
echo ============================================================
pause