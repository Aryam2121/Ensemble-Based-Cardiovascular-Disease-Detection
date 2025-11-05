# Quick Setup - Manual Steps

## You can skip virtual environment and install directly:

### 1. Install Dependencies
```powershell
cd C:\Users\aryam\Desktop\detection\backend
pip install fastapi uvicorn numpy pandas scikit-learn tensorflow matplotlib seaborn pydantic python-multipart
```

### 2. Create Models Directory
```powershell
New-Item -ItemType Directory -Path models -Force
```

### 3. Start Backend API (models will use mock data if not trained)
```powershell
uvicorn main:app --reload
```
API runs at: http://localhost:8000

### 4. Frontend Setup (New Terminal)
```powershell
cd C:\Users\aryam\Desktop\detection\frontend
npm run dev
```
Frontend runs at: http://localhost:3000

---

## The API will work with mock predictions until you train models

To train models later, create a simple Python script or use the API's mock mode.

The frontend is already installed and ready!

Just run these two commands in separate terminals:
1. Backend: `cd backend && uvicorn main:app --reload`
2. Frontend: `cd frontend && npm run dev`
