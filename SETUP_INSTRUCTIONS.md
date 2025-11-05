# SETUP INSTRUCTIONS - Cardiovascular Disease Detection

## Step 1: Create Virtual Environment
```powershell
cd C:\Users\aryam\Desktop\detection\backend
python -m venv venv
```

## Step 2: Activate Virtual Environment
```powershell
venv\Scripts\Activate.ps1
```

If you get an execution policy error, run this first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Step 3: Install Python Dependencies
```powershell
pip install --upgrade pip
pip install -r requirements.txt
```

## Step 4: Train ML Models
```powershell
python notebooks\train_models.py
```
This will generate 4 trained models in `backend/models/`

## Step 5: Start Backend API
```powershell
uvicorn main:app --reload
```
Backend will run at: http://localhost:8000

## Step 6: Setup Frontend (New Terminal)
```powershell
cd C:\Users\aryam\Desktop\detection\frontend
npm install
npm run dev
```
Frontend will run at: http://localhost:3000

---

## Quick Start (After Initial Setup)

**Terminal 1 - Backend:**
```powershell
cd C:\Users\aryam\Desktop\detection\backend
venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\aryam\Desktop\detection\frontend
npm run dev
```

---

## Troubleshooting

### Virtual Environment Not Activating
Use CMD instead:
```cmd
cd C:\Users\aryam\Desktop\detection\backend
venv\Scripts\activate.bat
```

### TensorFlow Installation Issues
If TensorFlow fails to install, try:
```powershell
pip install tensorflow --no-cache-dir
```

### Port Already in Use
Backend (8000):
```powershell
uvicorn main:app --reload --port 8001
```

Frontend (3000):
```powershell
npm run dev -- -p 3001
```
