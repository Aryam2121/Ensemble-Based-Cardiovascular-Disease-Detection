# 🚀 Quick Start Guide
## Ensemble-Based Cardiovascular Heart Disease Detection System

This guide will help you get the project running in 5 minutes!

---

## ✅ Prerequisites

Make sure you have:
- **Python 3.9+** installed
- **Node.js 18+** installed
- **pnpm** or **npm** installed
- (Optional) **Docker** for containerized deployment

---

## 📦 Installation & Setup

### Option 1: Local Development (Recommended for Development)

#### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd detection
```

#### Step 2: Setup Backend
```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train models (this will take 5-10 minutes)
cd notebooks
python train_models.py
cd ..

# Start backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will run at: **http://localhost:8000**
API Docs: **http://localhost:8000/docs**

#### Step 3: Setup Frontend (Open New Terminal)
```bash
# Navigate to frontend
cd frontend

# Install dependencies
pnpm install
# or: npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start frontend server
pnpm dev
# or: npm run dev
```

Frontend will run at: **http://localhost:3000**

---

### Option 2: Docker Deployment (Recommended for Production)

```bash
# From project root
docker-compose up --build
```

This will start both frontend and backend:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000

---

## 🧪 Testing the System

### 1. Quick Test via Browser

Visit **http://localhost:3000** and:
1. Click on "Risk Prediction" tab
2. Enter patient data (or use default values)
3. Click "Predict Risk"
4. View the results!

### 2. Test via API (Swagger UI)

Visit **http://localhost:8000/docs** and:
1. Expand `POST /predict`
2. Click "Try it out"
3. Use the example JSON
4. Click "Execute"
5. See the prediction response

### 3. Test via cURL

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 63,
    "sex": 1,
    "cp": 3,
    "trestbps": 145,
    "chol": 233,
    "fbs": 1,
    "restecg": 0,
    "thalach": 150,
    "exang": 0,
    "oldpeak": 2.3,
    "slope": 0,
    "ca": 0,
    "thal": 1
  }'
```

---

## 📁 Project Structure

```
detection/
├── frontend/          # Next.js React Application
│   ├── app/          # Pages and API routes
│   ├── components/   # React components
│   └── package.json
│
├── backend/          # FastAPI Backend
│   ├── main.py      # Main API application
│   ├── models/      # Trained ML models
│   ├── notebooks/   # Training scripts
│   └── requirements.txt
│
├── docker-compose.yml
└── README.md
```

---

## 🎯 Key Features to Try

### 1. Risk Prediction
- Enter patient data
- Get instant CVD risk percentage
- See color-coded risk level (Low/Moderate/High)
- View individual model predictions

### 2. Model Analytics
- View performance metrics
- See accuracy, precision, recall, F1-score, AUC
- Compare all 5 models (SVM, RF, GB, DNN, Ensemble)

### 3. Model Comparison
- Interactive charts
- ROC curves
- Confusion matrices

### 4. Batch Predictions
- Upload CSV with multiple patients
- Get bulk predictions
- Download results

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError`
```bash
# Solution: Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Reinstall dependencies
pip install -r requirements.txt
```

**Problem**: Models not found
```bash
# Solution: Train models first
cd backend/notebooks
python train_models.py
```

**Problem**: Port 8000 already in use
```bash
# Solution: Use different port
uvicorn main:app --reload --port 8001
```

### Frontend Issues

**Problem**: `Module not found`
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
pnpm install
```

**Problem**: API connection refused
```bash
# Solution: Check backend is running
# Update .env.local with correct backend URL
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

**Problem**: Port 3000 already in use
```bash
# Solution: Use different port
pnpm dev -- -p 3001
```

### Docker Issues

**Problem**: Docker build fails
```bash
# Solution: Clean docker cache
docker-compose down
docker system prune -a
docker-compose up --build
```

---

## 📊 Expected Results

After training, you should see:

**Model Performance:**
- SVM: ~78% accuracy, 0.84 AUC
- Random Forest: ~80% accuracy, 0.85 AUC
- Gradient Boosting: ~81% accuracy, 0.86 AUC
- Neural Network: ~79% accuracy, 0.84 AUC
- **Ensemble: ~82% accuracy, 0.87 AUC** ✨

**Generated Files:**
- `backend/models/` - Trained model files (.pkl)
- `backend/results/` - Visualization plots (.png)
- `backend/results/metrics.json` - Performance metrics

---

## 🚀 Deployment

### Deploy Frontend to Vercel

```bash
cd frontend
vercel deploy
```

### Deploy Backend to Render

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Deploy!

---

## 📚 Next Steps

1. ✅ **Customize**: Modify models, add features
2. ✅ **Deploy**: Push to production
3. ✅ **Present**: Use for your research conference
4. ✅ **Extend**: Add authentication, PDF reports, more visualizations

---

## 💡 Tips

- **For Research Paper**: Use the metrics from `results/metrics.json`
- **For Demo**: Use the web interface at localhost:3000
- **For Testing**: Use the Swagger UI at localhost:8000/docs
- **For Integration**: Use the REST API endpoints

---

## 📞 Need Help?

- Check the full README.md
- Check backend/README.md for API details
- Check frontend/README.md for UI details
- Open an issue on GitHub

---

## 🎉 Success!

You now have a fully functional CVD detection system based on your IEEE research paper!

**What you built:**
✅ Production-ready ML ensemble system  
✅ Modern web interface  
✅ RESTful API  
✅ Docker deployment  
✅ Comprehensive documentation  

**Perfect for:**
🎓 Final year project presentation  
📄 Research paper demonstration  
💼 Portfolio project  
🚀 Real-world deployment  

---

**Good luck with your conference! 🌟**
