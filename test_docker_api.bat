@echo off
echo Testing Dockerized Backend API...
echo.
echo Testing Health Endpoint:
powershell -Command "$response = Invoke-WebRequest -Uri http://localhost:8000/health -UseBasicParsing; $response.Content"
echo.
echo Testing Prediction Endpoint:
powershell -Command "$body = @{age=63; sex=1; cp=3; trestbps=145; chol=233; fbs=1; restecg=0; thalach=150; exang=0; oldpeak=2.3; slope=0; ca=0; thal=1} | ConvertTo-Json; $response = Invoke-WebRequest -Uri http://localhost:8000/predict -Method POST -Body $body -ContentType 'application/json' -UseBasicParsing; $response.Content"
pause