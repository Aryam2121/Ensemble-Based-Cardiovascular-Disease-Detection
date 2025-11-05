@echo off
echo Starting Frontend (connecting to Dockerized Backend)...
cd /d "%~dp0frontend"
set NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
pause