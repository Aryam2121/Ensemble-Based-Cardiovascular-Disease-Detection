from fastapi.testclient import TestClient
from main import app
import csv

client = TestClient(app)

# Call /health
print('CALL: /health')
resp = client.get('/health')
print('STATUS:', resp.status_code)
print(resp.json())

# Read first row from heart.csv (relative to repo root)
csv_path = r'C:\Users\aryam\Desktop\detection\heart.csv'
with open(csv_path, 'r', newline='') as f:
    reader = csv.DictReader(f)
    first = next(reader)

# Prepare JSON payload mapping CSV columns to PatientData fields
payload = {
    'age': float(first['age']),
    'sex': int(first['sex']),
    'cp': int(first['cp']),
    'trestbps': float(first['trestbps']),
    'chol': float(first['chol']),
    'fbs': int(first['fbs']),
    'restecg': int(first['restecg']),
    'thalach': float(first['thalach']),
    'exang': int(first['exang']),
    'oldpeak': float(first['oldpeak']),
    'slope': int(first['slope']),
    'ca': int(first['ca']),
    'thal': int(first['thal'])
}

print('\nCALL: /predict with first row of heart.csv')
resp = client.post('/predict', json=payload)
print('STATUS:', resp.status_code)
print(resp.json())
