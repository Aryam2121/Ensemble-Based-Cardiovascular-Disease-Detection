"""Configuration settings for the CVD Detection API"""

import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent

# Model configuration
MODEL_DIR = os.path.join(BASE_DIR, "models")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")

# Model weights for ensemble
ENSEMBLE_WEIGHTS = {
    'svm': 0.25,
    'random_forest': 0.25,
    'gradient_boosting': 0.30,
    'neural_network': 0.20
}

# Risk thresholds
RISK_THRESHOLDS = {
    'low': 0.3,
    'moderate': 0.7,
    'high': 1.0
}

# Feature names
FEATURE_NAMES = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
    'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
]

# API settings
API_TITLE = "CVD Detection System"
API_VERSION = "1.0.0"
API_DESCRIPTION = "Ensemble-based Cardiovascular Disease Detection using Machine Learning"
