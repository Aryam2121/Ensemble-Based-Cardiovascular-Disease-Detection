@echo off
echo Testing Live Backend on Render...
echo URL: https://ensemble-based-cardiovascular-disease.onrender.com
echo.
echo Testing Health Endpoint:
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://ensemble-based-cardiovascular-disease.onrender.com/health' -UseBasicParsing; Write-Host 'Status:' $response.StatusCode -ForegroundColor Green; $response.Content } catch { Write-Host 'Error:' $_.Exception.Message -ForegroundColor Red }"
echo.
echo Testing Prediction Endpoint:
powershell -Command "try { $body = @{age=63; sex=1; cp=3; trestbps=145; chol=233; fbs=1; restecg=0; thalach=150; exang=0; oldpeak=2.3; slope=0; ca=0; thal=1} | ConvertTo-Json; $response = Invoke-WebRequest -Uri 'https://ensemble-based-cardiovascular-disease.onrender.com/predict' -Method POST -Body $body -ContentType 'application/json' -UseBasicParsing; Write-Host 'Status:' $response.StatusCode -ForegroundColor Green; $response.Content } catch { Write-Host 'Error:' $_.Exception.Message -ForegroundColor Red }"
pause