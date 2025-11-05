# CVD Detection System - Complete Setup and Run Guide

## Quick Start (Windows)

### Option 1: Automated Startup (Recommended)
1. Double-click `start_all.bat` in the project root
2. Wait for both servers to start
3. Open http://localhost:3000 in your browser

### Option 2: Manual Startup

#### Terminal 1 - Backend
```cmd
cd /d C:\Users\aryam\Desktop\detection\backend
python -m pip install --upgrade pip
pip install -r requirements.txt
python notebooks\train_models.py C:\Users\aryam\Desktop\detection\heart.csv
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

#### Terminal 2 - Frontend
```cmd
cd /d C:\Users\aryam\Desktop\detection\frontend
npm install
npm run dev
```

## Access Points

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://127.0.0.1:8000
- **API Documentation**: http://127.0.0.1:8000/docs
- **Health Check**: http://127.0.0.1:8000/health

## Testing the System

### 1. Backend Health Check
```cmd
curl http://127.0.0.1:8000/health
```

### 2. Test Prediction with Heart.csv Data
```cmd
curl -X POST http://127.0.0.1:8000/predict -H "Content-Type: application/json" -d "{\"age\":63,\"sex\":1,\"cp\":3,\"trestbps\":145,\"chol\":233,\"fbs\":1,\"restecg\":0,\"thalach\":150,\"exang\":0,\"oldpeak\":2.3,\"slope\":0,\"ca\":0,\"thal\":1}"
```

### 3. Frontend Integration
1. Open http://localhost:3000
2. Navigate to "Risk Prediction" tab
3. Fill in patient data (use heart.csv values for testing)
4. Click "Predict Risk" to see ensemble results

## Project Structure

```
detection/
├── heart.csv                 # Training data
├── start_all.bat            # Automated startup script
├── backend/                 # FastAPI backend
│   ├── main.py             # API endpoints
│   ├── requirements.txt    # Python dependencies
│   ├── notebooks/
│   │   └── train_models.py # ML training pipeline
│   └── models/             # Trained model files
│       ├── svm_model.pkl
│       ├── rf_model.pkl
│       ├── gb_model.pkl
│       ├── nn_model.h5
│       └── scaler.pkl
└── frontend/               # Next.js frontend
    ├── app/
    │   ├── page.tsx       # Main application
    │   └── api/predict/
    │       └── route.ts   # Backend integration
    └── components/        # UI components
```

## Features Implemented

### Backend (FastAPI)
- ✅ Ensemble ML model (SVM, Random Forest, Gradient Boosting, DNN)
- ✅ Training pipeline using heart.csv data
- ✅ REST API endpoints (/health, /predict, /metrics, /batch-predict)
- ✅ Model weights: SVM (25%), RF (25%), GB (30%), DNN (20%)
- ✅ Mock fallback if models missing

### Frontend (Next.js + React)
- ✅ Modern UI with Tailwind CSS and Radix components
- ✅ Risk prediction form with validation
- ✅ Real-time results display
- ✅ Model analytics dashboard
- ✅ Model comparison charts
- ✅ Responsive design

### Integration
- ✅ Frontend API route connects to FastAPI backend
- ✅ Real ensemble predictions using heart.csv trained models
- ✅ Error handling and loading states
- ✅ Environment variable support for backend URL

## Data Pipeline

1. **Training**: `heart.csv` → ML models → `backend/models/`
2. **Prediction**: Frontend form → `/api/predict` → FastAPI `/predict` → Ensemble result
3. **Display**: JSON response → React components → User interface

## Troubleshooting

### Backend Issues
- If port 8000 is busy: `netstat -ano | findstr :8000` and kill the process
- If models missing: Run `python notebooks\train_models.py heart.csv`
- If dependencies fail: Use `python -m venv venv` and activate before installing

### Frontend Issues
- If npm install fails: Try `npm install --legacy-peer-deps`
- If port 3000 is busy: Set PORT=3001 and restart
- If backend connection fails: Check BACKEND_URL environment variable

### Docker Alternative
If you prefer Docker:
```cmd
docker compose up --build
```

## Production Deployment

### Backend (FastAPI)
- Deploy to Render, Railway, or similar Python hosting
- Set environment variables for production database if needed
- Use `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Next.js)
- Deploy to Vercel, Netlify, or similar
- Set BACKEND_URL environment variable to production API URL
- Build with `npm run build && npm start`