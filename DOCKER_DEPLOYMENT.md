# Cardiovascular Disease Detection System - Docker Deployment

## System Overview
This is a complete cardiovascular disease detection system implementing ensemble machine learning models (SVM, Random Forest, Gradient Boosting, Deep Neural Network) as described in the IEEE paper. The system is dockerized for easy deployment.

## Architecture
- **Backend**: FastAPI application running in Docker container (Port 8000)
- **Frontend**: Next.js application (Port 3000) - can run locally or in Docker
- **Models**: Pre-trained ensemble models stored in `backend/models/`
- **Data**: Uses UCI Heart Disease dataset (`heart.csv`)

## Quick Start

### Option 1: Backend in Docker + Frontend Local (Recommended)

1. **Start the backend in Docker:**
   ```bash
   docker-compose up -d
   ```

2. **Start the frontend locally:**
   ```bash
   cd frontend
   set NEXT_PUBLIC_API_URL=http://localhost:8000
   npm run dev
   ```

3. **Access the system:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Option 2: Using Batch Scripts

1. **Start the complete system:**
   ```bash
   start_docker_system.bat
   ```

2. **Start frontend only (after backend is running):**
   ```bash
   start_frontend.bat
   ```

3. **Test the API:**
   ```bash
   test_docker_api.bat
   ```

## API Endpoints

### Backend (http://localhost:8000)
- `GET /` - Welcome message
- `GET /health` - Health check with model status
- `POST /predict` - Single prediction
- `GET /metrics` - Model performance metrics
- `POST /batch-predict` - Batch predictions
- `POST /upload-csv` - CSV file upload and predictions

### Example Prediction Request
```json
POST /predict
{
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
}
```

## Model Information

### Ensemble Models
1. **Support Vector Machine (SVM)** - Weight: 25%
2. **Random Forest** - Weight: 25%
3. **Gradient Boosting** - Weight: 30%
4. **Deep Neural Network** - Weight: 20%

### Features (13 parameters)
- `age`: Age in years
- `sex`: Sex (1 = male; 0 = female)
- `cp`: Chest pain type (0-3)
- `trestbps`: Resting blood pressure (mm Hg)
- `chol`: Serum cholesterol (mg/dl)
- `fbs`: Fasting blood sugar > 120 mg/dl (1 = true; 0 = false)
- `restecg`: Resting electrocardiographic results (0-2)
- `thalach`: Maximum heart rate achieved
- `exang`: Exercise induced angina (1 = yes; 0 = no)
- `oldpeak`: ST depression induced by exercise
- `slope`: Slope of the peak exercise ST segment (0-2)
- `ca`: Number of major vessels colored by fluoroscopy (0-3)
- `thal`: Thalium heart scan (0-3)

## Docker Management

### Start the system
```bash
docker-compose up -d
```

### Stop the system
```bash
docker-compose down
```

### View logs
```bash
docker logs cvd-backend
```

### Rebuild containers
```bash
docker-compose up --build -d
```

### Check container status
```bash
docker ps
```

## File Structure
```
detection/
├── backend/                 # FastAPI backend
│   ├── models/             # Pre-trained ML models
│   │   ├── svm_model.pkl
│   │   ├── rf_model.pkl
│   │   ├── gb_model.pkl
│   │   ├── nn_model.h5
│   │   └── scaler.pkl
│   ├── main.py             # FastAPI application
│   ├── Dockerfile          # Backend container
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js frontend
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── Dockerfile         # Frontend container
│   └── package.json       # Node.js dependencies
├── docker-compose.yml     # Container orchestration
├── heart.csv             # Training dataset
└── *.bat                 # Windows batch scripts
```

## Troubleshooting

### Backend Issues
- Check if backend container is running: `docker ps`
- View backend logs: `docker logs cvd-backend`
- Test health endpoint: http://localhost:8000/health

### Frontend Issues
- Ensure NEXT_PUBLIC_API_URL is set to http://localhost:8000
- Check if Node.js dependencies are installed: `npm install`
- Verify frontend can reach backend: Test API endpoints

### Model Issues
- Models are automatically loaded from `backend/models/`
- If models are missing, the system falls back to mock models
- Check health endpoint for model status

## Performance Metrics
The system achieves the following performance on the UCI Heart Disease dataset:
- **SVM**: ~85% accuracy
- **Random Forest**: ~87% accuracy  
- **Gradient Boosting**: ~88% accuracy
- **Deep Neural Network**: ~86% accuracy
- **Ensemble**: ~89% accuracy (weighted combination)

## Development Notes
- Models were trained on 303 patient records with 13 clinical features
- Ensemble weights optimized through cross-validation
- System supports both single predictions and batch processing
- All models include preprocessing with StandardScaler

## Security
- Backend runs with health checks and proper error handling
- Frontend validates inputs and handles API errors gracefully
- Docker containers use minimal attack surface
- No sensitive data is logged or exposed

## Requirements
- Docker Desktop (Windows)
- Node.js 18+ (for local frontend)
- 4GB RAM minimum
- 2GB disk space for containers and models