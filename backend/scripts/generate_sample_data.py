"""Generate sample CVD dataset for testing"""

import pandas as pd
import numpy as np
from pathlib import Path

def generate_cvd_dataset(n_samples=300, output_path='data/heart.csv'):
    """Generate synthetic CVD dataset"""
    
    np.random.seed(42)
    
    # Generate features
    data = {
        'age': np.random.randint(30, 80, n_samples),
        'sex': np.random.randint(0, 2, n_samples),
        'cp': np.random.randint(0, 4, n_samples),
        'trestbps': np.random.randint(90, 200, n_samples),
        'chol': np.random.randint(100, 400, n_samples),
        'fbs': np.random.randint(0, 2, n_samples),
        'restecg': np.random.randint(0, 3, n_samples),
        'thalach': np.random.randint(60, 200, n_samples),
        'exang': np.random.randint(0, 2, n_samples),
        'oldpeak': np.random.uniform(0, 6, n_samples),
        'slope': np.random.randint(0, 3, n_samples),
        'ca': np.random.randint(0, 4, n_samples),
        'thal': np.random.randint(0, 4, n_samples),
    }
    
    df = pd.DataFrame(data)
    
    # Generate target based on risk factors
    df['target'] = (
        (df['age'] > 55) * 0.3 +
        (df['chol'] > 240) * 0.2 +
        (df['trestbps'] > 140) * 0.2 +
        (df['thalach'] < 100) * 0.15 +
        (df['oldpeak'] > 2) * 0.15
    ) > 0.5
    
    df['target'] = df['target'].astype(int)
    
    # Save to CSV
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)
    
    print(f"Dataset saved to {output_path}")
    print(f"Shape: {df.shape}")
    print(f"Class distribution:\n{df['target'].value_counts()}")
    
    return df

if __name__ == "__main__":
    generate_cvd_dataset()
