# 🚀 Manual Startup Commands

## For PowerShell Users

### Start Backend
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Start Frontend (New Terminal)
```powershell
cd frontend
pnpm install
# or: npm install

# Create .env.local
"NEXT_PUBLIC_API_URL=http://localhost:8000" | Out-File -FilePath .env.local -Encoding UTF8

pnpm dev
# or: npm run dev
```

### Train Models (Optional - Pre-trained models included)
```powershell
cd backend\notebooks
python train_models.py
```

---

## For CMD Users

### Start Backend
```cmd
cd backend
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Start Frontend (New Terminal)
```cmd
cd frontend
pnpm install
REM or: npm install

REM Create .env.local
echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local

pnpm dev
REM or: npm run dev
```

---

## Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **API ReDoc**: http://localhost:8000/redoc

---

## Quick Test

Once both are running:

1. Open http://localhost:3000
2. Click "Risk Prediction" tab
3. Enter patient data (or use defaults)
4. Click "Predict Risk"
5. View results!

---

## Troubleshooting

### PowerShell Execution Policy Error
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use
```powershell
# Backend - use different port
uvicorn main:app --reload --port 8001

# Frontend - use different port
pnpm dev -- -p 3001
```

### Module Not Found
```powershell
# Reactivate virtual environment
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

---

## Docker Alternative

If you have Docker installed:

```powershell
docker-compose up --build
```

This starts both frontend and backend automatically!

---

## Stop Services

### Stop Backend
Press `Ctrl+C` in the backend terminal

### Stop Frontend
Press `Ctrl+C` in the frontend terminal

### Stop Docker
```powershell
docker-compose down
```
