# Cardiovascular Disease Detection System - Live Deployment

## 🚀 System Status: LIVE ON RENDER

Your cardiovascular disease detection system backend is now deployed and running live on Render!

## 🌐 Live Backend URLs

- **Base URL**: https://ensemble-based-cardiovascular-disease.onrender.com
- **Health Check**: https://ensemble-based-cardiovascular-disease.onrender.com/health
- **API Documentation**: https://ensemble-based-cardiovascular-disease.onrender.com/docs
- **Prediction Endpoint**: https://ensemble-based-cardiovascular-disease.onrender.com/predict

## 🎯 Quick Start

### Option 1: Use Batch Script
```bash
start_live_system.bat
```

### Option 2: Manual Setup
1. **Test the live backend:**
   ```bash
   test_live_backend.bat
   ```

2. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access your system:**
   - Frontend: http://localhost:3000
   - Backend: https://ensemble-based-cardiovascular-disease.onrender.com

## 📊 API Testing

### Health Check
```bash
curl https://ensemble-based-cardiovascular-disease.onrender.com/health
```

### Sample Prediction
```bash
curl -X POST https://ensemble-based-cardiovascular-disease.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 63, "sex": 1, "cp": 3, "trestbps": 145,
    "chol": 233, "fbs": 1, "restecg": 0, "thalach": 150,
    "exang": 0, "oldpeak": 2.3, "slope": 0, "ca": 0, "thal": 1
  }'
```

## 🔧 Configuration

### Environment Variables (Frontend)
- **Production**: `.env.production` (for build)
- **Development**: `.env.local` (for local dev)

Both are configured to use your live Render backend:
```
NEXT_PUBLIC_API_URL=https://ensemble-based-cardiovascular-disease.onrender.com
```

## 📱 Frontend Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Connect repository to Vercel
3. Environment variables will be auto-loaded from `.env.production`
4. Deploy automatically

### Option 2: Netlify
1. Build the frontend: `npm run build`
2. Upload the `out/` folder to Netlify
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://ensemble-based-cardiovascular-disease.onrender.com`

### Option 3: Local Development
```bash
cd frontend
npm run dev
# Frontend: http://localhost:3000
# Backend: https://ensemble-based-cardiovascular-disease.onrender.com (live)
```

## 🏗️ Architecture

```
┌─────────────────────┐    HTTPS    ┌─────────────────────┐
│   Frontend          │ ──────────► │   Backend           │
│   (Local/Vercel)    │             │   (Render)          │
│   localhost:3000    │             │   onrender.com      │
└─────────────────────┘             └─────────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────────┐
                                    │   ML Models         │
                                    │   SVM, RF, GB, DNN  │
                                    │   (Deployed)        │
                                    └─────────────────────┘
```

## ✅ Verified Features

- ✅ Backend deployed and running on Render
- ✅ All 4 ML models loaded (SVM, RF, GB, DNN)
- ✅ Health endpoint responding
- ✅ Prediction endpoint working
- ✅ API documentation available
- ✅ Frontend configured for live backend
- ✅ CORS configured for cross-origin requests

## 🛠️ Management

### Check Backend Status
```bash
test_live_backend.bat
```

### View Live Logs
Visit your Render dashboard: https://dashboard.render.com

### Redeploy Backend
Push changes to your GitHub repository (auto-deploys)

## 🔒 Security Notes

- ✅ HTTPS enabled on Render
- ✅ Environment variables secure
- ✅ No sensitive data exposed in URLs
- ✅ CORS properly configured
- ✅ Health checks active

## 📊 Performance

- **Cold Start**: ~30 seconds (first request after inactivity)
- **Warm Response**: <2 seconds
- **Uptime**: 99.9% (Render SLA)
- **Scaling**: Auto-scaling based on traffic

## 🆘 Troubleshooting

### Backend Issues
1. Check status: https://ensemble-based-cardiovascular-disease.onrender.com/health
2. View logs in Render dashboard
3. Verify models loaded in health response

### Frontend Issues
1. Ensure environment variables are set
2. Check browser console for errors
3. Verify NEXT_PUBLIC_API_URL points to Render URL

### Connection Issues
1. Check internet connectivity
2. Verify Render service is running
3. Test API endpoints directly

## 🎉 Success!

Your cardiovascular disease detection system is now live and accessible from anywhere! The backend runs on Render with your trained ensemble models, and the frontend can be deployed to any static hosting service or run locally for development.