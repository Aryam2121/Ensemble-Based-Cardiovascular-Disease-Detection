from pathlib import Path
from typing import Dict, List

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import numpy as np
import pandas as pd
import joblib
import os
from datetime import datetime
import logging

logger = logging.getLogger("cvd_api")
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"

app = FastAPI(title="CVD Detection API",
              description="Lightweight ensemble CVD detection API (mock mode if models missing)",
              version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------- Pydantic models ----------------
class PatientData(BaseModel):
    age: float = Field(..., ge=0, le=120)
    sex: int = Field(..., ge=0, le=1)
    cp: int = Field(..., ge=0, le=3)
    trestbps: float = Field(..., ge=50, le=300)
    chol: float = Field(..., ge=50, le=1000)
    fbs: int = Field(..., ge=0, le=1)
    restecg: int = Field(..., ge=0, le=2)
    thalach: float = Field(..., ge=20, le=300)
    exang: int = Field(..., ge=0, le=1)
    oldpeak: float = Field(..., ge=0.0, le=10.0)
    slope: int = Field(..., ge=0, le=2)
    ca: int = Field(..., ge=0, le=4)
    thal: int = Field(..., ge=0, le=3)


class PredictionResponse(BaseModel):
    risk_percentage: float
    risk_level: str
    ensemble_probability: float
    model_predictions: Dict[str, float]
    confidence_scores: Dict[str, float]
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())


class MetricsResponse(BaseModel):
    model_name: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    auc: float


class BatchPredictionResponse(BaseModel):
    predictions: List[PredictionResponse]
    count: int
    average_risk: float
    high_risk_count: int
    moderate_risk_count: int
    low_risk_count: int


# ---------------- Globals ----------------
models: Dict[str, object] = {}
scaler = None

# Weights per research setup (can be tuned)
MODEL_WEIGHTS = {
    'svm': 0.25,
    'random_forest': 0.25,
    'gradient_boosting': 0.30,
    'neural_network': 0.20,
}


def create_mock_model(name: str):
    """Return a tiny mock object implementing predict / predict_proba."""

    class Mock:
        def predict(self, X):
            # deterministic-ish: use sum of features to produce a 0/1
            s = np.sum(X, axis=1)
            return (s > 0).astype(int)

        def predict_proba(self, X):
            s = np.tanh(np.sum(X, axis=1) / (np.max(np.abs(X)) + 1e-6))
            prob = (s + 1) / 2
            return np.vstack([1 - prob, prob]).T

    logger.info(f"Created mock model: {name}")
    return Mock()


def create_mock_scaler():
    class MockScaler:
        def fit(self, X):
            return self

        def transform(self, X):
            return np.array(X, dtype=float)

    return MockScaler()


def load_models():
    """Try loading models from disk; fall back to mocks if missing."""
    global models, scaler
    models = {}
    scaler = None

    if MODELS_DIR.exists() and MODELS_DIR.is_dir():
        logger.info(f"Looking for models in {MODELS_DIR}")
        # load common files if present
        try:
            svm_path = MODELS_DIR / 'svm_model.pkl'
            rf_path = MODELS_DIR / 'rf_model.pkl'
            gb_path = MODELS_DIR / 'gb_model.pkl'
            nn_path = MODELS_DIR / 'nn_model.h5'
            scaler_path = MODELS_DIR / 'scaler.pkl'

            if svm_path.exists():
                models['svm'] = joblib.load(svm_path)
                logger.info('Loaded svm_model.pkl')
            if rf_path.exists():
                models['random_forest'] = joblib.load(rf_path)
                logger.info('Loaded rf_model.pkl')
            if gb_path.exists():
                models['gradient_boosting'] = joblib.load(gb_path)
                logger.info('Loaded gb_model.pkl')
            if nn_path.exists():
                # lazy-load to avoid heavy imports if not needed; use importlib to avoid static import resolution issues
                try:
                    import importlib
                    try:
                        load_model = getattr(importlib.import_module('tensorflow.keras.models'), 'load_model')
                    except Exception:
                        # fallback to standalone keras if tensorflow package isn't available
                        load_model = getattr(importlib.import_module('keras.models'), 'load_model')
                    models['neural_network'] = load_model(str(nn_path))
                    logger.info('Loaded nn_model.h5')
                except Exception as e:
                    logger.warning(f'Unable to load NN model: {e}')
            if scaler_path.exists():
                scaler = joblib.load(scaler_path)
                logger.info('Loaded scaler.pkl')
        except Exception as e:
            logger.error(f"Error loading models: {e}")

    # If some models are missing, create mocks so API still runs
    for key in ['svm', 'random_forest', 'gradient_boosting', 'neural_network']:
        if key not in models:
            models[key] = create_mock_model(key)

    if scaler is None:
        scaler = create_mock_scaler()

    logger.info(f"Models available: {list(models.keys())}")


def preprocess(patient: PatientData) -> np.ndarray:
    arr = np.array([[
        patient.age,
        patient.sex,
        patient.cp,
        patient.trestbps,
        patient.chol,
        patient.fbs,
        patient.restecg,
        patient.thalach,
        patient.exang,
        patient.oldpeak,
        patient.slope,
        patient.ca,
        patient.thal,
    ]], dtype=float)
    try:
        return scaler.transform(arr)
    except Exception:
        return arr


def ensemble_predict_single(patient: PatientData) -> Dict:
    features = preprocess(patient)
    preds = {}
    # Get per-model probabilities
    for name, model in models.items():
        try:
            if hasattr(model, 'predict_proba'):
                prob = float(model.predict_proba(features)[0][1])
            else:
                # fallback for models that only implement predict
                pred = model.predict(features)[0]
                prob = float(pred)
        except Exception:
            # unexpected model behavior -> mock
            prob = float(np.clip((np.sum(features) % 1.0), 0.01, 0.99))
        preds[name] = prob

    # Weighted ensemble
    ensemble_prob = sum(preds.get(k, 0.0) * MODEL_WEIGHTS.get(k, 0.0) for k in MODEL_WEIGHTS)

    if ensemble_prob < 0.3:
        level = 'low'
    elif ensemble_prob < 0.7:
        level = 'moderate'
    else:
        level = 'high'

    response = {
        'risk_percentage': round(ensemble_prob * 100, 2),
        'risk_level': level,
        'ensemble_probability': round(ensemble_prob, 4),
        'model_predictions': {k: round(v, 4) for k, v in preds.items()},
        'confidence_scores': {k: round(v, 4) for k, v in preds.items()},
    }
    return response


@app.on_event("startup")
async def startup():
    logger.info("Starting CVD Detection API (startup)")
    load_models()


@app.get("/")
async def root():
    return {"message": "CVD Detection API", "version": app.version}


@app.get("/health")
async def health():
    return {"status": "healthy", "models_loaded": list(models.keys()), "timestamp": datetime.now().isoformat()}


@app.post("/predict", response_model=PredictionResponse)
async def predict(patient: PatientData):
    try:
        logger.info(f"Predict request: age={patient.age}")
        result = ensemble_predict_single(patient)
        return PredictionResponse(**result)
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/metrics", response_model=List[MetricsResponse])
async def metrics():
    # Static placeholder metrics (replace with trained metrics after training)
    placeholder = [
        MetricsResponse(model_name='SVM', accuracy=0.78, precision=0.81, recall=0.75, f1_score=0.78, auc=0.84),
        MetricsResponse(model_name='Random Forest', accuracy=0.80, precision=0.82, recall=0.79, f1_score=0.80, auc=0.85),
        MetricsResponse(model_name='Gradient Boosting', accuracy=0.81, precision=0.83, recall=0.80, f1_score=0.81, auc=0.86),
        MetricsResponse(model_name='Neural Network', accuracy=0.79, precision=0.80, recall=0.78, f1_score=0.79, auc=0.84),
        MetricsResponse(model_name='Ensemble', accuracy=0.82, precision=0.84, recall=0.81, f1_score=0.82, auc=0.87),
    ]
    return placeholder


@app.post("/batch-predict", response_model=BatchPredictionResponse)
async def batch_predict(patients: List[PatientData]):
    results = [ensemble_predict_single(p) for p in patients]
    risk_percentages = [r['risk_percentage'] for r in results]
    avg = round(sum(risk_percentages) / len(risk_percentages), 2) if risk_percentages else 0.0
    high = sum(1 for r in results if r['risk_level'] == 'high')
    moderate = sum(1 for r in results if r['risk_level'] == 'moderate')
    low = sum(1 for r in results if r['risk_level'] == 'low')
    predictions = [PredictionResponse(**r) for r in results]
    return BatchPredictionResponse(predictions=predictions, count=len(predictions), average_risk=avg,
                                   high_risk_count=high, moderate_risk_count=moderate, low_risk_count=low)


@app.post('/upload-csv')
async def upload_csv(file: UploadFile = File(...)):
    try:
        raw = await file.read()
        df = pd.read_csv(pd.io.common.BytesIO(raw))
        patients = []
        for _, row in df.iterrows():
            patients.append(PatientData(**row.to_dict()))
        resp = await batch_predict(patients)
        return {"filename": file.filename, "summary": {"total": resp.count, "average_risk": resp.average_risk}}
    except Exception as e:
        logger.error(f"CSV upload error: {e}")
        raise HTTPException(status_code=400, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)