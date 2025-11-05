"""Data preprocessing utilities"""

import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib
from config import SCALER_PATH, FEATURE_NAMES

class DataPreprocessor:
    """Handle data preprocessing for model predictions"""
    
    def __init__(self, scaler_path=SCALER_PATH):
        self.scaler = self._load_or_create_scaler(scaler_path)
    
    def _load_or_create_scaler(self, scaler_path):
        """Load existing scaler or create new one"""
        try:
            return joblib.load(scaler_path)
        except FileNotFoundError:
            # Create a default scaler with typical CVD dataset statistics
            scaler = StandardScaler()
            # Fit with typical ranges for CVD features
            typical_data = np.array([
                [50, 1, 1, 130, 200, 0, 1, 140, 0, 1.0, 1, 0, 2],  # Typical patient 1
                [60, 0, 2, 140, 250, 1, 0, 150, 1, 2.0, 2, 1, 3],  # Typical patient 2
            ])
            scaler.fit(typical_data)
            return scaler
    
    def preprocess(self, data_dict):
        """Preprocess patient data"""
        features = np.array([[
            data_dict.get('age', 0),
            data_dict.get('sex', 0),
            data_dict.get('cp', 0),
            data_dict.get('trestbps', 0),
            data_dict.get('chol', 0),
            data_dict.get('fbs', 0),
            data_dict.get('restecg', 0),
            data_dict.get('thalach', 0),
            data_dict.get('exang', 0),
            data_dict.get('oldpeak', 0),
            data_dict.get('slope', 0),
            data_dict.get('ca', 0),
            data_dict.get('thal', 0)
        ]])
        
        return self.scaler.transform(features)
    
    def validate_input(self, data_dict):
        """Validate input data ranges"""
        errors = []
        
        if not 0 <= data_dict.get('age', 0) <= 120:
            errors.append("Age must be between 0 and 120")
        if data_dict.get('sex', 0) not in [0, 1]:
            errors.append("Sex must be 0 (female) or 1 (male)")
        if not 0 <= data_dict.get('cp', 0) <= 3:
            errors.append("Chest pain type must be between 0 and 3")
        if not 0 <= data_dict.get('trestbps', 0) <= 200:
            errors.append("Resting BP must be between 0 and 200")
        if not 0 <= data_dict.get('chol', 0) <= 400:
            errors.append("Cholesterol must be between 0 and 400")
        
        return errors
