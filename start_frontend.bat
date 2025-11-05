@echo off
echo Starting Frontend (connecting to Live Backend on Render)...
cd /d "%~dp0frontend"
set NEXT_PUBLIC_API_URL=https://ensemble-based-cardiovascular-disease.onrender.com
npm run dev
pause